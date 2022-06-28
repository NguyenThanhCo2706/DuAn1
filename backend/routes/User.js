const router = require('express').Router();
const userController = require('../controllers/UserController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser)

module.exports = router