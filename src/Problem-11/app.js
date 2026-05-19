//app.js

import express from 'express';
import router from './router.js';
import { logger } from './middleware.js';
import { globalErrorHandler } from './controllers.js';
const app = express();
app.use(express.json());



app.use(logger);
app.use('/api/v1', router);
app.use(globalErrorHandler);



export default app;
