const userService = require('../services/userService')
const responseFormatter =  require('../utils/responseFormatter')

exports.register = async (req, res) => {
    try {
        await userService.register(req.body)
        return res.status(201).json(responseFormatter({}, 'Registered successfully', 'success', 201))
    } catch (e) {
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

exports.login = async (req, res) => {
    try {
        const result = await userService.login(req.body)
        return res.status(200).json(responseFormatter(result, 'LoggedIn successfully', 'success', 200))
    } catch (e) {
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}