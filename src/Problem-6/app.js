//app.js

import express from 'express';
import { customLoggerMiddle } from './customLoggerMiddle.js';

const app = express();
app.use(express.json());

const dataBase = [
    {name: 'Jobayer', email: 'jobayerjoban0048@gmail.com', id: 1},
    {name: 'Joban', email: 'joban04@gmail.com', id: 2},
    {name: 'Fahim', email: 'fahim@gmail.com', id: 3},
    {name: 'Karim', email: 'karim@gmail.com', id: 4},
];


/*
const customLogger = (req, res, next) => {
    console.log(`${req.method} - ${req.originalUrl} - ${new Date().toISOString()}`);

    next();

}

*/


app.use(customLoggerMiddle);

app.get('/api/v1/users',(req, res, next) => {
    res.send('User send request');

});





export default app;
