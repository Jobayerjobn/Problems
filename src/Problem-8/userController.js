//userController.js

import dataBase from './dataBase.js';
import AppError from './errorHandler.js';
import { responseHelper } from './logger.js';

export const getUser = (req, res, next) => {
    if(dataBase.length === 0){
        return next(new AppError('User not found', 404));
    };

    responseHelper(res, 200, 'User fetch successfully', dataBase);

};


export const uniqueUser = (req, res, next) => {
    const id = Number(req.params.id);
    const findUser = dataBase.find(i => i.id === id);

    if(!findUser){
       return next(new AppError('User not found', 404));
    };

    responseHelper(res, 200, 'User fetch successfully', findUser);


};



export const postUser = (req, res, next) => {
    const{name, email} = req.body;
    if(!name || !email) {
        return next(new AppError('Name and email are required', 400));

    };

    //existing user 
    const existUser = dataBase.find(e => e.email === email);
    if(existUser){
        return next(new AppError('Existing User', 400));
    };
    
    const newUser = {
        name,
        email,
        id: Date.now() || dataBase.length + 1,
        
    }
    dataBase.push(newUser);


    responseHelper(res, 201, 'User create successfully', newUser);


};


export const putUser = (req, res, next) => {
    const {name, email} = req.body;
    const id = Number(req.params.id);
    const findIndex = dataBase.findIndex(i => i.id === id);
    if(findIndex === -1){
        return next(new AppError('User not found', 404));

    };
    dataBase[findIndex] = {
        name: name,
        email: email,
        id: id,

    }
    responseHelper(res, 200, 'User Update successfully', dataBase[findIndex]);

};

export const patchUser = (req, res, next) => {
    const id = Number(req.params.id);
    const {name, email} = req.body;
    const findIndex = dataBase.findIndex(i => i.id ===  id);
    if(findIndex === -1){
        return next(new AppError('User not found', 404));

    };
    dataBase[findIndex] = {
        ...dataBase[findIndex],
        ...req.body,

    };

    responseHelper(res, 200, 'Partial user update successfully', dataBase[findIndex]);

};


export const deleteUser = (req, res, next) => {
    const id = Number(req.params.id);
    console.log(id);
    console.log(dataBase);
    const findAccountIndex = dataBase.findIndex(i => i.id === id);
    console.log(findAccountIndex);

    if(findAccountIndex === -1){
        return next(new AppError('User Account not found', 404));
    };
    dataBase.splice(findAccountIndex, 1);
    responseHelper(res, 200, 'User Account delete successfully', dataBase);

};
