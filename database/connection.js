const { Sequelize } = require('sequelize')
const config = require('./config')
const dbParams = config[process.env.NODE_ENV]
const sequelize = new Sequelize(dbParams.database, dbParams.username, dbParams.password, { host: dbParams.host, dialect: dbParams.dialect, logging: process.env.NODE_ENV === 'development' })

module.exports = sequelize
