const router = require('express').Router()
const studentController = require('../controllers/StudentController')
const middlewareUser = require('../middleware/MiddlewareUser')

router.get('/list', studentController.getAllStudent)
router.get('/', middlewareUser.verifyToken, studentController.getStudent)
router.post('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, studentController.createStudent)
router.put('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, studentController.updateStudent)
router.delete('/', middlewareUser.verifyToken, middlewareUser.verifyTokenAndAdminUser, studentController.deleteStudent)



module.exports = router