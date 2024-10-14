const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const validator = require('../middlewares/validator')
const schema = require('../validators/index')
const { validateToken, checkUserExist} = require('../middlewares/auth')

/* Trying out webhooks
router.post('/success', paymentController.handlePaymentSuccess)
router.post('/failure', paymentController.handlePaymentFailure)
*/
router.use(validateToken, checkUserExist)

/* Hash Payment */
router.post('/hash', paymentController.hashPayment)

module.exports = router