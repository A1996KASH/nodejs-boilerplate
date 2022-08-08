// Package Imports
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const hpp = require('hpp')
const morgan = require('morgan')
const path = require('path')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const { setRelatons } = require('../database/relations')
// load env variables
dotenv.config({ debug: process.env.DEBUG })

// Internal Imports or Middleware Imports will come here
const errorHandler = require('../middleware/error')
// Import DB
const sequelize = require('../database/connection')

// route files
const courses = require('../api/courses/')
const instructor = require('../api/instructors')

// connect to DB
sequelize.authenticate()
  .then(() => {
    setRelatons()
    sequelize.sync({}).then((result) => {
      console.log(result)
    })
    console.log('DB Connected')
  })
  .catch(err => console.log('Error: ' + err))
const app = express()

// Body Parser
app.use(express.json())

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

if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
  }
  // cors
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
}

if (process.env.NODE_ENV === 'production') {
  const corsOptions = {
    origin: process.env.computationalUrl
  }
  // cors
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
}

// app.use(systemLogger())  // Enable API Audit; uncomment to enable API Audit

// file Upload
app.use(fileUpload())

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
app.use(express.static(path.join(__dirname, '../public'), options))
app.use(express.static(path.join(__dirname, '../public/client'), options))

// Use Routes
// All other routes should redirect to the index.html
app.use('/courses', courses)
app.use('/instructor', instructor)
// All other routes should redirect to the index.html
app.route('/*')
  .get((req, res) => {
    res.sendFile(path.resolve('public/client/index.html'))
  })
//
app.use(errorHandler)

module.exports = app
