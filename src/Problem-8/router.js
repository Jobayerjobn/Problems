//router.js

import express from 'express';
import { 
    getUser, 
    uniqueUser,
    postUser,
    putUser,
    patchUser,
    deleteUser

 } from './userController.js';

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', uniqueUser);
router.post('/login',postUser);
router.put('/profile/:id', putUser);
router.patch('/activity/:id', patchUser);
router.delete('/home/:id', deleteUser);


export default router;
