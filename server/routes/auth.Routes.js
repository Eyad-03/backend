import express from 'express';
import {register,login } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/auth/login', login);
router.post('/auth/register', register);


export default router;
