module.exports = (message, status) => {
    const error = new Error(message)
    error.details = {
        isCustomError: true,
        message: message,
        status: status
    }
    throw error
}