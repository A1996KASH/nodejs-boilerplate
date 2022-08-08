const { DataTypes } = require('sequelize')
const sequelize = require('../../../database/connection')

const Course = sequelize.define('course', {
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
  thinkificCourseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'thinkific_course_id'
  },
  courseLanguageCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'course_language_code'
  },
  coursePrice: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    field: 'course_price'
  },
  courseMaxRetailPrice: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    field: 'course_max_retail_price'
  },
  courseRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'course_rating'
  },
  courseStartDate: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'course_start_date'
  },
  courseEndDate: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'course_end_date'
  },
  imageUrl: {
    type: DataTypes.STRING(128),
    allowNull: false,
    field: 'image_url'
  },
  courseVideo: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'course_video'
  },
  courseWebUrl: {
    type: DataTypes.STRING(512),
    allowNull: false,
    field: 'course_web_url'
  },
  courseThinkificUrl: {
    type: DataTypes.STRING(512),
    allowNull: false,
    field: 'course_thinkific_url'
  },
  discount: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    field: 'discount'
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'review_count'
  },
  featured: {
    type: DataTypes.TINYINT,
    allowNull: false,
    field: 'is_featured'
  },
  courseShareUrl: {
    type: DataTypes.STRING(512),
    allowNull: false,
    unique: true,
    field: 'course_share_url'
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  referenceCourseId: {
    type: DataTypes.INTEGER,
    field: 'reference_course_id'
  },
  minAppVersionSupported: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'min_app_version_supported'
  },
  isActive: {
    type: DataTypes.TINYINT,
    allowNull: false,
    field: 'is_active'
  },
  availableLanguage: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'available_language'
  },
  languageCodeIcon: {
    type: DataTypes.STRING(128),
    allowNull: false,
    field: 'language_code_icon'
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
  tableName: 'course',
  timestamps: false
})

module.exports = Course
