// Middleware to NOT FOUND
const notFound = (req, res, next) => {
    const error = new Error(`not found :(  ${req.originalUrl} `)
    res.status(404)
    next(error);
}
    // this Error class in JS => اللي بعده ده ال error constractor بتاعه



// ERROR Handle Middleware
const errorHandler = (err, req, res, next) => {
    /*
    اذاال statusCode = 200 نحولها to 500 لو مش 200 خليها ع ال statusCode
    */
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
        // stack يعني يدينا مسار ان الايرور فين 
    })
} // فيها err زيادة عن اي middleware 

// نروح بقا نعمل route



// export
module.exports = {
    errorHandler,
    notFound
}