const router = require('express').Router()
const studentController = require('../controllers/StudentController')
const middlewareUser = require('../middleware/MiddlewareUser')
const MiddlewareStudent = require('../middleware/MiddlewareStudent')

router.get('/list', studentController.getAllStudent)
router.get('/search', studentController.getStudentByName)
router.get('/', middlewareUser.verifyToken, studentController.getStudent)
router.post('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, MiddlewareStudent.handleCreate, studentController.createStudent)
router.put('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, studentController.updateStudent)
router.delete('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, studentController.deleteStudent)



module.exports = router