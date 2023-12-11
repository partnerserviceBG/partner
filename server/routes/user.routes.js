const {Router} = require("express");
const router = new Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router