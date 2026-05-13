import AppError from "./customError.js";

export const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration:`${duration}ms`,
            localTime: new Date().toLocaleString(),
            timeStamp: new Date().toISOString(),


        })
    });
    next();

};


export const userValidation = (req, res, next) => {
    const {name, email} = req.body;
    if(!name || !email){
        return next(new AppError('Name and Email are required', 400));

    };

    if(typeof name !== 'string' || typeof email !== 'string'){
        return next(new AppError('Invalid Data Type', 400));
    };
    //const email = jobayerjoban0048@gmail.com;

    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!checkEmail.test(email)){
        return next(new AppError('Invalid Email format', 400));

    };
    next();


};


export const responseHelper = (res, status, message, data=null) => {
    res.status(status).json({
        success: true,
        status,
        message,
        data,

    });
};

