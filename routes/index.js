const router = require('express').Router()

/* User Routes */
const userRoutes = require('./userRoutes.js')
router.use('/users', userRoutes)

/* User Routes */
const paymentRoutes = require('./paymentRoutes.js')
router.use('/payments', paymentRoutes)

module.exports = router