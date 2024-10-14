const payUService = require('../services/payUService')
const responseFormatter =  require('../utils/responseFormatter')

exports.makePayment = async (req, res) => {
    try {
        const result = await payUService.makePayment(req.body)
        return res.status(200).json(responseFormatter(result, 'Successfully made payment', 'success', 200))
    } catch (e) {
        console.log(e)
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

exports.hashPayment = async (req, res) => {
    try {
        const result = await payUService.hashPayment(req.body)
        return res.status(200).json(responseFormatter(result, 'Successfully hashed', 'success', 200))
    } catch (e) {
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

exports.handlePaymentSuccess = async (req, res) => {
    try {
        console.log(req.body)
        // const result = await payUService.hashPayment(req.body)
        // return res.status(200).json(responseFormatter(result, 'Successfully hashed', 'success', 200))
    } catch (e) {
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}

exports.handlePaymentFailure = async (req, res) => {
    try {
        console.log(req.body)
        // const result = await payUService.hashPayment(req.body)
        // return res.status(200).json(responseFormatter(result, 'Successfully hashed', 'success', 200))
    } catch (e) {
        if (e.isCustomError) {
            return res.status(e.status).json(responseFormatter({}, e.message, 'error', e.status))
        } else {
            return res.status(500).json(responseFormatter({}, 'Internal Server Error', 'error', 500))
        }
    }
}
