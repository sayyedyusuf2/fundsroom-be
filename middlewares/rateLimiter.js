const { rateLimit } = require("express-rate-limit")

module.exports = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP, Please try again in an hour!'
})