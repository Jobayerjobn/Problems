//controller.js

import AppError from "./customError.js";
import dataBase from "./database.js";
import { responseHelper } from "./logger.js";

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        status: err.status || 'error',
        message: err.isOperational ? err.message : 'Something went wrong',
        //stack: err.stack,

    });

};



//GET Users 
export const getUsers = (req, res, next) => {
    if(dataBase.length === 0){
        return next(new AppError('User not found', 404));

    };
    responseHelper(res, 200, 'User fetch successfully', dataBase);

};

//GET unique users 

export const uniqueUsers = (req, res, next) => {
   // const value = Number(req.params.id);
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 5;
    const findUser = dataBase.filter(i => i.id === value);
    if(findUser.length === 0){
        return next(new AppError('User not found', 404));

    };
    //const page = 1;
   // const limit = 1;
    const firstIndex = (page - 1) * limit;
    const lastIndex = firstIndex + limit;
    const val = findUser.slice(firstIndex, lastIndex);

    responseHelper(res, 200, 'User fetch successfully', val);

};

//POST users 
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

//PUT users
export const putUsers = (req, res, next) => {
    const {name, email, id} =  req.body;

    const value = Number(req.params.id);

    const findId = dataBase.findIndex(i => i.id === value);
    if(findId === -1){
        return next(new AppError('User not found', 404));

    };

    dataBase[findId] = {
       ...req.body,


    };

    responseHelper(res, 200, 'User update successfully', dataBase[findId]);

};


//Patch users
export const patchUsers = (req, res, next) => {
    const {name, email} = req.body;
    const value = Number(req.params.id);
    const findId = dataBase.findIndex(i => i.id === value);

    if(Object.keys(req.body).length === 0){
        return next(new AppError('Please provide data to update', 400));
    }

    if(findId === -1){
        return next(new AppError('User not found', 404));
    };
    dataBase[findId] = {
        ...dataBase[findId],
        ...req.body,

    };
    responseHelper(res, 200, 'User updata successfully', dataBase[findId]);


};

//Delete users 
export const deleteUsers = (req, res, next) => {
    const id =  Number(req.params.id);
    const  findUser = dataBase.findIndex(u => u.id === id);
    if(findUser === -1) {
        return next(new AppError('User not found', 404));

    };
    dataBase.splice(findUser, 1);
    responseHelper(res, 200, 'User delete successfully', dataBase);
};

