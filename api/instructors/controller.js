const asyncHandler = require('../../middleware/async')
const Instructor = require('./models/instructor')

// @desc     Get Instructors
// @route    GET /instructors/list
// @access   Private
exports.getInstructors = asyncHandler(async (req, res, next) => {
  const instructors = await Instructor.findAll()
  res.status(200).json({ status: 200, results: instructors })
})
