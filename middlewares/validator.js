const responseFormatter = require('../utils/responseFormatter')

module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
        file: req.file
      },{
        strict: true
     }
    )
    return next()
  } catch (e) {
    return res.status(400).json(responseFormatter({type: e.name, message: e.message}, e.message, 'Bad request.', 400))
  }
}