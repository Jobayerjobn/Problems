//router.js


import express from 'express';
import { createUsers, getUsers, uniqueUsers } from './controllers.js';

const router = express.Router();

router.route('/users')
        .get(getUsers)
        .post(createUsers)

router.get('/search', uniqueUsers);



export default router;
