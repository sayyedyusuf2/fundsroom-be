const responseFormatter = require('../utils/responseFormatter')

module.exports = (err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json(responseFormatter({}, 'Payload too large', 'Bad request.', 413))
    } else {
        next(err)
    }
}