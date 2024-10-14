const registerSchema = require('./validateRegister')
const loginSchema = require('./validateLogin')
const authorizationSchema = require('./validateAuth')

module.exports = {
    registerSchema,
    loginSchema,
    authorizationSchema
}