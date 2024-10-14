const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnection')
const User = require('./userSchema')

const Payment = sequelize.define(
    'Payment', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    }
)

module.exports = Payment
