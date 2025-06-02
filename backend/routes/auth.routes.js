import { Router } from 'express';
import {
    registerUser,
    userLogin,
    logoutUser
} from '../controllers/auth.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(upload.single('avatar'), registerUser);

router.route("/login").post(userLogin);

router.route("/logout").post(verifyJWT, logoutUser)

export default router;