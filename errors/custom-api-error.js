class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

const createCustomError = (msg, StatusCode) => {
    return new customAPIError(msg, StatusCode)
}

module.exports = {
    CustomAPIError,
    createCustomError
}