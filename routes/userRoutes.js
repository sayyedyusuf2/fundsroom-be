const router = require('express').Router()
const userController = require('../controllers/userController')
const validator = require('../middlewares/validator')
const schema = require('../validators/index')

/* Register */
router.post('/register', validator(schema.registerSchema), userController.register)

/* Login */
router.post('/login', validator(schema.loginSchema), userController.login)

module.exports = router