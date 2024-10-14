const User = require('../models/userSchema')
const logger = require('../utils/logger')
const commonFunctions = require('../utils/commonFunctions')
const customErrorFormatter = require('../utils/customErrorFormatter')
const crypto = require('crypto')
const axios = require('axios')

class PayUService {
    async makePayment (data) {
        try {
            const { amount, firstname, email, phone, userId } = data
            const txnid = Math.floor(Math.random() * 1000000)
            const productinfo = 'Test Product'
            const surl = 'http://localhost:3000/payment/success'
            const furl = 'http://localhost:3000/payment/failure'
            const hashString = `${process.env.PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${process.env.PAYU_SALT}`
            const hash = crypto.createHash('sha512').update(hashString).digest('hex')
            const formData = new FormData()
            formData.append('key', process.env.PAYU_KEY)
            formData.append('txnid', txnid)
            formData.append('firstname', firstname)
            formData.append('amount', amount)
            formData.append('productinfo', productinfo)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('surl', surl)
            formData.append('furl', furl)
            formData.append('hash', hash)
            // const paymentData = {
            //     key: process.env.PAYU_KEY,
            //     txnid,
            //     amount,
            //     productinfo,
            //     firstname,
            //     email,
            //     phone,
            //     surl,
            //     furl,
            //     hash
            // }
            const response = await axios.post(process.env.PAYU_BASE_URL, formData, {headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }})
            return response.data
        } catch (e) {
            console.log(e)
            logger.error('Error occurred making payment in PayUService %s:', JSON.stringify(e))
            if (e?.details?.isCustomError) {
                throw {...e?.details}
            }
            throw e
        }
    }

    async hashPayment (data) {
        try {
            const { txnid, amount, productinfo, firstname, email } = data
            const hashString = `${process.env.PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${process.env.PAYU_SALT}`
            const hash = crypto.createHash('sha512').update(hashString).digest('hex')
            return hash
        } catch (e) {
            logger.error('Error occurred making payment in PayUService %s:', JSON.stringify(e))
            if (e?.details?.isCustomError) {
                throw {...e?.details}
            }
            throw e
        }
    }
}

const obj = new PayUService()
Object.freeze(obj)

module.exports = obj