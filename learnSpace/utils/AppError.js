class AppError extends Error{
    constructor(message,statusCode){
        super(message),
        this.statusCode = statusCode,
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor); // look into this later 
    }
}

export default AppError;