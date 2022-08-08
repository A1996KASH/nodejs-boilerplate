// Package Imports
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
// const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const hpp = require('hpp')
const morgan = require('morgan')
const path = require('path')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const { createProxyMiddleware } = require('http-proxy-middleware')
const Bugsnag = require('@bugsnag/js')
const BugsnagPluginExpress = require('@bugsnag/plugin-express')
const queryString = require('query-string')
const { i18nInit } = require('../utils/convertLocale')
// load env variables
dotenv.config({ debug: process.env.DEBUG })
const winston = require('../utils/winstonLoggly')
// Internal Imports or Middleware Imports will come here
const errorHandler = require('../middleware/error')

// Initialize ii18n
i18nInit()
// Redis
const redis = require('../config/redisClient')

// Import DB
const sequelize = require('../database/connection')
const { setRelatons } = require('../database/relations')

// Import routes
const { routes } = require('../api/')

// Starting Bugsnag
Bugsnag.start({
  apiKey: process.env.BUGSNAG_KEY,
  plugins: [BugsnagPluginExpress]
})

// Import SQS Consumers
const { sqsConsumers } = require('../sqsConsumer/')

// connect to DB
sequelize.authenticate()
  .then(() => {
    setRelatons()
    sequelize.sync({}).then((result) => {
    })
    console.log('DB Connected')
  })
  .catch(err => console.log('Error: ' + err))

redis.on('connect', () => {
  console.log('Redis connected')
})

const app = express()
const middleware = Bugsnag.getPlugin('express')

// This must be the first piece of middleware in the stack.
// It can only capture errors in downstream middleware
app.use(middleware.requestHandler)

// Body Parser for all route disbaled bcoz of proxy for now
// app.use(express.json())

// set security hearder
app.use(helmet({
  contentSecurityPolicy: false
}))

// xss-clean
app.use(xss())

// Rate Limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
})

app.use(limiter)

// hpp
app.use(hpp())

app.use(cors())
app.options('*', cors())

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: winston.stream }))

// file Upload
// app.use(fileUpload())

// Initialize SQS Consumers
sqsConsumers()

// set static folder
var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  maxAge: '1h',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
const API_SERVICE_URL = `${process.env.PROXY_URL}/`
console.log(API_SERVICE_URL)
app.use(express.static(path.join(__dirname, '../public'), options))
app.use(express.static(path.join(__dirname, '../public/client'), options))

// Use Routes
routes(app, express)

app.use('/*', createProxyMiddleware({
  onProxyReq: (proxyReq, req, res) => {
    if (!req.body || !Object.keys(req.body).length) {
      return
    }
    const contentType = proxyReq.getHeader('Content-Type').trim().toLocaleLowerCase()
    const writeBody = (bodyData) => {
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }

    if (contentType === 'application/json') {
      writeBody(JSON.stringify(req.body))
    }
    if (contentType === 'application/json; charset=utf-8') {
      writeBody(JSON.stringify(req.body))
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      writeBody(queryString.stringify(req.body))
    }
  },
  target: API_SERVICE_URL,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  headers: {
    Connection: 'keep-alive'
  }
}))

// This handles any errors that Express catches. This needs to go before other
// error handlers. Bugsnag will call the `next` error handler if it exists.
app.use(errorHandler)
app.use(middleware.errorHandler)

module.exports = app
