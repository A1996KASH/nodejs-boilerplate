const express = require('express')
const router = express.Router()
const { getInstructors } = require('./controller')
router.route('/list').get(getInstructors)

module.exports = router
