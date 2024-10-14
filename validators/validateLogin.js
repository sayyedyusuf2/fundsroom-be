const yup = require('yup')
const loginSchema = yup.object(
    {
        body: yup.object({
            email: yup.string().required('Email is required'),
            password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
        })
    }
)
module.exports = loginSchema