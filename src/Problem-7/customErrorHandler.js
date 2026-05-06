//customErrorHandler.js

class AppError extends Error{
    constructor(message, statusCode){
        super(message); //call Error constructor
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail': 'error';

        this.operational = true; // just Professional system
        Error.captureStackTrace(this, this.constructor); //capture
        //if environment development is then access this
       // stack: process.env.NODE_ENV === 'development' ? err.stack : null 
        
    }
};

export default AppError;
