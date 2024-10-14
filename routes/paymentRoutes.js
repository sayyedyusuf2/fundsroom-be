const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const validator = require('../middlewares/validator')
const schema = require('../validators/index')
const { validateToken, checkUserExist} = require('../middlewares/auth')

/* Make Payment */
router.post('/', paymentController.makePayment)

/* Hash Payment */
router.post('/success', paymentController.handlePaymentSuccess)
router.get('/success', paymentController.handlePaymentSuccess)

/* Hash Payment */
router.post('/failure', paymentController.handlePaymentFailure)
router.get('/failure', paymentController.handlePaymentFailure)

router.use(validateToken, checkUserExist)

/* Hash Payment */
router.post('/hash', paymentController.hashPayment)

module.exports = router