import express from 'express';
import {searchUsers,getAllUsers,deleteUser,updateUser } from '../controllers/users.Controller.js';

const router = express.Router();


router.get('/getAllUser', getAllUsers);
router.post('/search', searchUsers);
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)

export default router;
