const yup = require('yup')
const registerSchema = yup.object(
    {
        body: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().required('Email is required'),
            password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
        })
    }
)
module.exports = registerSchema