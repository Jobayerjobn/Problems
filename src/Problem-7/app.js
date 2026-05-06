//app.js
import express from 'express';
import AppError from './customErrorHandler.js';
import { customLogger, globalErrorHandler, responseHelper} from './customHandler.js';

const app = express();
app.use(express.json());

const dataBase = [
   // {name: 'Jobayer', email: 'jobayerjoban0048@gmail.com', id: 1},
    //{name: 'Joban', email: 'joban00@gmail.com', id: 2},
   // {name: 'Karim', email: 'karim@gmail.com', id: 3},
    //{name: 'Jobber', eamil: 'jobber@gmail.com', id: 4}
];

app.use(customLogger);

app.get('/api/v1/users', (req, res, next) => {
    if(dataBase.length === 0){
        return next(new AppError('User not found', 404));
    };
    responseHelper(res, 200, 'User fetch successfully', dataBase);

    
    /*
    res.status(200).json({
        success: true,
        message: 'User list fetch successfully',
        data: dataBase,

    });


    */

    

});

/*
app.all('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl}`, 404)); // sending custom error handler Class

});

*/


app.use(globalErrorHandler); // use global error handler middleware.
//app.use(responseHelper);




export default app;
