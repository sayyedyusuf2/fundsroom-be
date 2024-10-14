const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const validator = require('../middlewares/validator')
const schema = require('../validators/index')

/* Make Payment */
router.post('/', paymentController.makePayment)

/* Hash Payment */
router.post('/hash', paymentController.hashPayment)

/* Hash Payment */
router.post('/success', paymentController.handlePaymentSuccess)

/* Hash Payment */
router.post('/failure', paymentController.handlePaymentFailure)

module.exports = router