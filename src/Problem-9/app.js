import express from 'express';
import router from './router.js';
import { logger } from './logger.js';
import { globalError} from './userController.js';
const app = express();
app.use(express.json());



app.use(logger);
app.use('/api/v1', router);

app.use(globalError);




export default app;

