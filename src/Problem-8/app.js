//app.js

import express from 'express';
import router from './router.js';
import { customLogger, globalErrorHandler } from './logger.js';



const app = express();
app.use(express.json());


//base route 
app.use(customLogger);
app.use('/api/v1', router);
//app.use('/api/v1', uniqueUser);
//app.use('/api/v1', postUser);
//app.use('/api/v1', putUser);
//app.use('/api/v1', patchUser);
//app.use('api/v1', patchUser);
//app.use('/api/v1',deleteUser);
app.use(globalErrorHandler);



export default app;

