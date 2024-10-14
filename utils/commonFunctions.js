const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken')
const customErrorFormatter = require('./customErrorFormatter')

exports.generateHashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) reject(err)
            bcryptjs.hash(password, salt, (err, hashedPassword) => {
                if (err) reject(err)
                resolve(hashedPassword)
            })
        })
    })
}

exports.comparePassword = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcryptjs.compare(plainPassword, hashedPassword, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.generateToken = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({id}, process.env.SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) reject(err)
            resolve(token) 
        })
    })
}

exports.verifyToken = (token, secret) => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (err, result) => {
            if (err) customErrorFormatter(err.message, 401)
            resolve(result) 
        })
    })
}