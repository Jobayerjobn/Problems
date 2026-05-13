import dataBase from './dataBase.js';
import { responseHelper } from './logger.js';
import AppError from './customError.js';

export const globalError = (err, req, res, next)  => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        status: err.status || 'error',
        message: err.isOperational ? err.message : 'Something went Wrong',

        
    });
    

};



//getUsers 
export const getUsers = (req, res, next) => {
    if(dataBase.length === 0){
        return next(new AppError('User not Found', 404));

    };

    responseHelper(res, 200, 'User fetch successfully', dataBase);

};

//find users
export const postUsers = (req, res, next) => {
    const {name, email} = req.body;
    const newUser = {
       name,
       email,
       id: dataBase.length + 1, //Date.now();
    };

    dataBase.push(newUser);

    responseHelper(res, 200, 'User create successfully', newUser);
    
};
