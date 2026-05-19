//controller.js

import AppError from "./customError.js";
import { responseHelper } from "./middleware.js";
import User from "./model.js";

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
    });

};

export const createUsers = async(req, res, next) => {
    try{
        const {name, email} = req.body;
        const exitingUser = await User.findOne({email});

        if(exitingUser){
            return next(new AppError('existing email', 400));
        }
        const newUser = await User.create({name, email});
        responseHelper(res, 201, 'User fetch successfully', newUser);

    }catch(err){
        return next(new AppError(err.message, 500));
    }
};

export const uniqueUsers = async(req, res, next) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || '';

        const skip = (page - 1) * limit;

        const query = {
            name: {
                $regex: search,
                $options: 'i'
            }
        };

        const users = await User.find(query)
        .skip(skip)
        .limit(limit);

        responseHelper(res, 200, 'User fetch successfully', users);



    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const getUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find();
        if(!allUsers || allUsers.length === 0){
           return responseHelper(res, 404, 'User not found', allUsers);
        };

        responseHelper(res, 200, 'User fetch successfully', allUsers);

    }catch(error){
        return next(new AppError(error.message, 500));
    };

};

