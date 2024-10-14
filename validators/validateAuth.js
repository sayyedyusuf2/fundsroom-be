'use strict';

(async () => {
  const yup = require('yup')

  yup.addMethod(yup.string, 'bearerToken', function (errorMessage) {
    return this.test('test-bearer-token', errorMessage, function (value) {
      const { path, createError } = this
  
      if (!value) {
        return createError({ path, message: errorMessage || 'Bearer token is required' })
      }
  
      // Check if the token starts with "Bearer "
      if (!value.startsWith('Bearer ')) {
        return createError({ path, message: errorMessage || 'Authorization header must start with "Bearer "' })
      }
  
      return true
    })
  })

  const authorizationSchema = yup.object(
    {
      headers: yup.object({
        'authorization': yup.string().bearerToken().required('Authorization token is required')
      })
    }
  )

  module.exports = authorizationSchema
})()