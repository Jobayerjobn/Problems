import express from 'express';
import {getUsers, postUsers } from './userController.js';
import { userValidation } from './logger.js';
const router = express.Router();


router.route('/users')
        .get(getUsers)
        .post(userValidation, postUsers);



export default router;



