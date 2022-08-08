const express = require('express')
const router = express.Router()
const { getCourses } = require('./controller')
router.route('/list').get(getCourses)

module.exports = router
