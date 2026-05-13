//logger.js

import AppError from "./customError.js";
import dataBase from "./database.js";
export const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        //console.log(duration);

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            localTime: new Date().toLocaleString(),
            timeStamp: new Date().toISOString(),

        });

    });

    next();

};


export const validation = (req, res, next) => {
    const {name, email} = req.body;

    if(!name || !email){
        return next(new AppError('Name and Email are required', 400));

    };

    const existingEmail = dataBase.find(e => e.email === email);
    if(existingEmail){
        return next(new AppError('this email is existing', 400));

    }

    if(typeof name !== 'string' || typeof email !== 'string'){
        return next(new AppError('Wrong DataType', 400));
    };
    

    //const email = 'jobayerjoban0048@gmail.com';
    const emailChecker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailChecker.test(email)){
        return next(new AppError('Please give correct email', 400));

    };

    next();


};



export const responseHelper = (res, statusCode, message, data=null) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,

    });
};

