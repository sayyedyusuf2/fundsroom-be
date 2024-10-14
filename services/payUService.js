const logger = require('../utils/logger')
const crypto = require('crypto')

class PayUService {
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