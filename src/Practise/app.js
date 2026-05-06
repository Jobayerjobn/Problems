import express from 'express';
import AppError from './customError.js'
import { customLogger, globalErrorHandler, responseHelper } from './middleware.js';
const app = express();
app.use(express.json());

const dataBase = [
    {name: 'Jobayer', email: 'jobayerjoban0048@gmail.com', id: 1},
    {name: 'Joban', email: 'joban004@gmail.com', id: 2},
    {name: 'Karim', email: 'Karim@gmail.com', id: 3}

];

app.use(customLogger);

app.get('/api/v1/users', (req, res, next) => {
    if(dataBase.length === 0){
        return next(new AppError('User not found', 404));

    };
    responseHelper(res, 200, 'User fetch successfully', dataBase);

    /*
    res.status(200).json({
        success: false,
        message: 'User fetch successfully',
        data: dataBase,
    });
    */

});

/*
app.all('*', (req, res, next) => {
    next(new AppError('User Not Found', 404));
})
*/

app.use(globalErrorHandler);



export default app;
