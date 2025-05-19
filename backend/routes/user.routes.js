import ApiError from '../utils/ApiError.js';
import express from 'express';
// import { User } from '../models/user.model.js';
import { userLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', userLogin);

export default router;