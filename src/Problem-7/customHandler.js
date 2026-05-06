//customHandler.js

export const customLogger = (req, res, next) => {
    const start = Date.now();

    //we are running event after response finish
    res.on('finish', () => {
        const duration = Date.now() - start;


        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration:`${duration}ms`,
            time: new Date().toLocaleString(),
            timeStamp: new Date().toISOString(),

        });
    });

    next();

};

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        status: err.status || 'error',


    });

    
}

export const responseHelper = (res, status, message, data=null) => {
    res.status(status).json({
        success: true,
        status: status >= 200 && status < 300 ? 'success': 'fail',
        message,
        data
    });
};

