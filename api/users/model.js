const { DataTypes } = require('sequelize')
const sequelize = require('../../database/connection')

const Users = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Users
