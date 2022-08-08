const { DataTypes } = require('sequelize')
const sequelize = require('../../../database/connection')

const CourseInstructor = sequelize.define('courseInstructor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'true',
    field: 'course_id'
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'instructor_id'
  },
  language: {
    type: DataTypes.STRING(45),
    allowNull: false
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
  tableName: 'course_instructor',
  timestamps: false
})

module.exports = CourseInstructor
