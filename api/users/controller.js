const asyncHandler = require('../../middleware/async')
const User = require('./model')
// @desc     Get User
// @route    GET /api/v1/users/
// @access   Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll()
  res.status(200).json({ status: 'success', data: users })
})

exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const user = await User.create(req.body)
  res.status(201).json(user)
})
