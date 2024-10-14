const logger = require('../utils/logger')
const commonFunctions = require('../utils/commonFunctions')
const User = require('../models/userSchema')
const responseFormatter = require('../utils/responseFormatter')
const customErrorFormatter = require('../utils/customErrorFormatter')

const validateToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = await commonFunctions.verifyToken(token, process.env.SECRET)
        req.userId = decoded.id
        return next()
    } catch (e) {
        logger.error('Error occurred while verifying token in validateToken middleware %s:', JSON.stringify(e))
        if (e?.details?.isCustomError) {
        return res.status(e?.details?.status).json(responseFormatter({}, e?.details?.message, 'error', e?.details?.status))
        } else {
        return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

const checkUserExist = async (req, res, next) => {
    try {
        const userId = req.userId
        const user = await User.findByPk(userId)
        if (!user) customErrorFormatter('No such user', 401)
        req.user = user
        return next()
    } catch (e) {
        logger.error('Error occurred while checking user in checkUserExist middleware %s:', JSON.stringify(e))
        if (e?.details?.isCustomError) {
            return res.status(e?.details?.status).json(responseFormatter({}, e?.details?.message, 'error', e?.details?.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

module.exports = {
    validateToken,
    checkUserExist
}