const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnection')
const commonFunctions = require('../utils/commonFunctions')

const User = sequelize.define(
    'User', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await commonFunctions.generateHashedPassword(user.password)
            }
        }
    }
)

module.exports = User