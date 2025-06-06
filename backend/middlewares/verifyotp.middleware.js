import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const verifyOtpToken = async (req, res, next) => {
    try {
        const token = req.cookies?.otpToken;

        if (!token) {
            throw new ApiError(401, "OTP token is missing");
        }

        const decoded = jwt.verify(token, process.env.OTP_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(401, "Invalid or expired OTP token");
        }

        req.user = user;
        next();
    } catch (error) {
        return next(
            new ApiError(401, error.message || "Invalid OTP token")
        );
    }
};