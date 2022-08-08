const Course = require('../api/courses/models/course')
const CourseInstructor = require('../api/courses/models/courseInstructor')
const Instructor = require('../api/instructors/models/instructor')
exports.setRelatons = async () => {
  Instructor.belongsToMany(Course, { through: CourseInstructor, foreignKey: 'instructor_id' })
  Course.belongsToMany(Instructor, { through: CourseInstructor, foreignKey: 'course_id', as: 'instructorList' })
}
