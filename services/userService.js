const User = require('../models/userSchema')
const logger = require('../utils/logger')
const commonFunctions = require('../utils/commonFunctions')
const customErrorFormatter = require('../utils/customErrorFormatter')

class UserService {
    async register (data) {
        try {
            const {name, email, phone, password} = data
            const isAlreadyExist = await User.findOne({where: {email}})
            if (isAlreadyExist) customErrorFormatter('User already exist.', 419)
            await User.create({name, email, phone, password})
        } catch (e) {
            console.log(e)
            logger.error('Error occurred while registering user in UserService %s:', JSON.stringify(e))
            if (e?.details?.isCustomError) {
                throw {...e?.details}
            }
            throw e
        }
    }

    async login (data) {
        try {
            const {email, password} = data
            const user = await User.findOne({where: {email}})
            if (!user) customErrorFormatter('User does not exist.', 404)
            const isValidPassword = await commonFunctions.comparePassword(password, user.password)
            if (!isValidPassword) customErrorFormatter('Invalid username or password.', 401)
            const token = await commonFunctions.generateToken(user.id)
            delete user.dataValues.password
            return {user, token}
        } catch (e) {
            logger.error('Error occurred while login user in UserService %s:', JSON.stringify(e))
            if (e?.details?.isCustomError) {
                throw {...e?.details}
            }
            throw e
        }
    }
}

const obj = new UserService()
Object.freeze(obj)

module.exports = obj