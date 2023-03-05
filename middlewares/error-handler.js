const {CustomAPIError} = require('../errors/custom-api-error')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware =(err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statuscode).json({msg:err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'Something went wrong, Please try again later'})
}


module.exports = errorHandlerMiddleware