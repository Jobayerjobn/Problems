//router.js

import express from 'express';
import { getUsers, uniqueUsers, postUsers, putUsers, patchUsers, deleteUsers } from './controller.js';
import { validation } from './logger.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', uniqueUsers);
router.post('/profiles', validation, postUsers);
router.put('/home/:id', validation, putUsers);
router.patch('/home/:id',validation, patchUsers);
router.delete('/home/:id', deleteUsers);



export default router;
