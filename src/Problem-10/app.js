//app.js

import express from 'express';
import router from './router.js'
import { logger } from './logger.js';
import { globalErrorHandler} from './controller.js';


const app = express();
app.use(express.json());

app.use(logger);
app.use('/api/v1', router);
//app.use('/api/v1', uniqueUsers);
//app.use('/api/v1', postUsers);
//app.use('/api/v1', putUsers);
//app.use('/api/v1', patchUsers);
//app.use('/api/v1', deleteUsers);

app.use(globalErrorHandler);


export default app;
