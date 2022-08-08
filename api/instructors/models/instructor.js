const { DataTypes } = require('sequelize')
const sequelize = require('../../../database/connection')

const Instructor = sequelize.define('instructor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  profilePicture: {
    type: DataTypes.STRING(512),
    field: 'profile_picture'
  },
  signatureLink: {
    type: DataTypes.STRING(512),
    field: 'signature_link'
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'updated_at'
  }
}, {
  tableName: 'instructor',
  timestamps: false
})

module.exports = Instructor
