const asyncHandler = require('../../middleware/async')
const Course = require('./models/course')
const Instructor = require('../instructors/models/instructor')

// @desc     Get User
// @route    GET /courses/list
// @access   Private
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.findAll({
    include: {
      model: Instructor,
      as: 'instructorList'
    }
  })
  res.status(200).json({ status: 200, data: courses })
})
