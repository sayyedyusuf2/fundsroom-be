const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const responseFormatter = require('./utils/responseFormatter')

/* App Intialization */
const app = express()

/* Trust the proxy */
app.set('trust proxy', 1)

/* Rate Limiter Middleware */
const rateLimiter = require('./middlewares/rateLimiter.js')
app.use(rateLimiter)

app.use(cors())
app.use(helmet())

/* Parsing JSON body and limitng payload size */
const payloadSizeHandler = require('./middlewares/payloadSizeHandler.js')
app.use(express.json({limit: '10kb'}))
app.use(payloadSizeHandler)

/* Data sanitization against NoSQl query injection */
const mongoSanitize = require('express-mongo-sanitize')
app.use(mongoSanitize())

/* Data sanitization againt XSS  */
const xss = require('xss-clean')
app.use(xss())

const compression = require('compression')
app.use(compression())

/* Application Routes */
const routes = require('./routes/index.js')
app.use('/api/v1/', routes)

app.all('*', (req, res) => {
    return res.status(404).json(responseFormatter({}, `Can't find ${req.originalUrl} on this server!`, 'Bad Request.', 404))
})

module.exports = app