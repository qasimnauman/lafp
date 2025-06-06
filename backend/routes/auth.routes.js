import { Router } from 'express';
import {
    registerUser,
    userLogin,
    logoutUser,
    generateOTPToken,
    verifyOTP
} from '../controllers/auth.controller.js';
import { sendEmail } from '../utils/sendemail.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { verifyOtpToken } from "../middlewares/verifyotp.middleware.js"

const router = Router();

router.route("/register").post(upload.single('avatar'), registerUser);

router.route("/login").post(userLogin);

router.route("/logout").post(verifyJWT, logoutUser)

router.post("/emailtest", async (req, res, next) => {
    try {
        await sendEmail(
            "221345@students.au.edu.pk",
            "Test Email",
            "Testing",
            "<b>Hello world? my cute baby</b>"
        );
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        next(error); // pass to error handler middleware
    }
});

router.route("/testotp").post(generateOTPToken)
router.route("/verifyotp").post(verifyOtpToken, verifyOTP)

export default router;