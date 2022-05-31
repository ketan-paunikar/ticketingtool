

const errorHandler = (err, req, res, next) => {
    // the statusCode will represet the res.status in userController.js
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        // with the help of stack we will be able to navigate where the error is
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = { errorHandler }