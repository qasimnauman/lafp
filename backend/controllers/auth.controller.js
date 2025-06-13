import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { uploadToS3 } from "../utils/s3_upload.js";
import { sendEmail } from "../utils/sendemail.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const generatedAccessToken = user.generateAccessToken()
        const generatedRefreshToken = user.generateRefreshToken()

        console.log("Access", generatedAccessToken, "\nRefresh", generatedRefreshToken);

        user.refreshToken = generatedRefreshToken
        await user.save({
            validateBeforeSave: false,
        })

        return { generatedAccessToken, generatedRefreshToken }
    } catch (error) {
        // console.error("Token Generation Error:", error.message);
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const generatedOtps = new Set();

const generateOTP = () => {
    let otp;
    do {
        otp = Math.floor(100000 + Math.random() * 900000);
    } while (generatedOtps.has(otp));
    generatedOtps.add(otp);
    // Optionally, clean up old OTPs after some time if needed
    setTimeout(() => {
        generatedOtps.delete(otp);
    }, 5 * 60 * 1000);
    return otp;
};

const generateOTPToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const otp = generateOTP();

        if (typeof user.generateOTPToken !== 'function') {
            throw new Error("generateOTPToken method is not defined on user instance");
        }

        const otpToken = user.generateOTPToken(otp);
        user.otpToken = otpToken;
        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        console.log("Generated OTP:", otp);
        console.log("Generated OTP Token:", otpToken);
        return { otp, otpToken };
    } catch (error) {
        console.error("OTP generation error:", error);
        throw new ApiError(500, "Something went wrong while generating OTP");
    }
};

const registerUser = asyncHandler(
    async (req, res) => {
        const {
            username,
            email,
            fullName,
            password,
            confirmPassword,
            department,
            semester,
            studentId,
            contact,
            avatar,
            role
        } = req.body

        if (
            [
                username, email, password, confirmPassword, department, semester, studentId, contact, fullName
            ].some((feild) => feild?.trim() === "")
        ) {
            throw new ApiError(
                400, "All feilds required"
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid Email");
        }

        const existedUser = await User.findOne({
            $or: [
                { username }, { email }
            ]
        });

        if (existedUser) {
            throw new ApiError(409, `User ${username} is already registered`);
        }

        console.log("Req: file", req.file);

        if (!req.file) {
            throw new ApiError(400, "Avatar file is required");
        }

        const avatarUrl = await uploadToS3(
            req.file.path,
            req.file.originalname,
            req.file.mimetype
        );

        // const avatarUrl = await uploadToS3(avatarLocalPath);
        console.log("avatar url ", avatarUrl)

        if (!avatarUrl) {
            throw new ApiError(500, "Failed to upload avatar");
        }

        const newUser = await User.create({
            username,
            email,
            fullName,
            password,
            department,
            semester,
            studentId,
            contact,
            avatar: avatarUrl,
            role: "user"
        });
        console.log(newUser);

        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");


        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }

        const { otp, otpToken } = await generateOTPToken(createdUser._id);
        console.log("Generated OTP for user:", otp);
        console.log("Generated OTP Token for user:", otpToken);

        try {
            await sendEmail(
                createdUser.email,
                "Your OTP Code",
                `Your OTP code is: ${otp}`,
                `
            <div style="font-family: Arial, sans-serif; font-size: 16px;">
                <p>Hello ${createdUser.fullName || createdUser.username || 'User'},</p>
                <h2 style="color: #2b6cb0; font-size: 24px;">${otp}</h2>
                <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
                <p style="margin-top: 20px;">– Air University Lost and Found</p>
            </div>
            `
            );
        } catch (error) {
            console.error("Failed to send OTP email:", error);
            throw new ApiError(500, "Failed to send OTP email");
        }

        const options = {
            httpOnly: true,
            // maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        };

        return res
            .status(201)
            .cookie("otpToken", otpToken, options)
            .json(
                new ApiResponse(
                    201,
                    createdUser,
                    "User created successfully"
                )
            );
    }
);

const userLogin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User not registered");
    }

    const passwordCheck = await user.isPasswordCorrect(password);
    if (!passwordCheck) {
        throw new ApiError(401, "Incorrect password");
    }

    const { generatedAccessToken, generatedRefreshToken } = await generateAccessAndRefreshToken(user._id);
    console.log("Access Token:", generatedAccessToken);
    console.log("Refresh Token:", generatedRefreshToken);


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    if (!loggedInUser) {
        throw new ApiError(500, "Failed to retrieve logged-in user");
    }

    if (!loggedInUser.isVerified) {
        const { otp, otpToken } = await generateOTPToken(loggedInUser._id);
        console.log("Generated OTP for user:", otp);
        console.log("Generated OTP Token for user:", otpToken);

        // Send OTP via email
        try {
            await sendEmail(
                user.email,
                "Your OTP Code",
                `Your OTP code is: ${otp}`,
                `
            <div style="font-family: Arial, sans-serif; font-size: 16px;">
                <p>Hello ${loggedInUser.fullName || loggedInUser.username || 'User'},</p>
                <h2 style="color: #2b6cb0; font-size: 24px;">${otp}</h2>
                <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
                <p style="margin-top: 20px;">– Air University Lost and Found</p>
            </div>
            `
            );
        } catch (error) {
            console.error("Failed to send OTP email:", error);
            throw new ApiError(500, "Failed to send OTP email");
        }

        const options = {
            httpOnly: true,
            // maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        };

        return res.
            status(200)
            .cookie("otpToken", otpToken, options)
            .json(
                new ApiResponse(
                    200,
                    { user: loggedInUser, otpToken: otpToken },
                    "User logged in but not verified. OTP sent to email."
                )
            );
    }



    const options = {
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", generatedAccessToken, options)
        .cookie("refreshToken", generatedRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken: generatedAccessToken, refreshToken: generatedRefreshToken },
                "User logged in"
            )
        );
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body;

    // console.log('Received OTP:', otp);

    if (!otp) {
        throw new ApiError(400, "OTP is required");
    }

    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    // console.log('User data in verifyOTP:', req.user);

    if (!req.cookies?.otpToken) {
        console.error('No OTP token for user:', req.user._id);
        throw new ApiError(400, "No OTP token found for user. Please request a new OTP.");
    }

    try {
        const decoded = jwt.verify(req.cookies?.otpToken, process.env.OTP_TOKEN_SECRET);
        // console.log('Decoded OTP token:', decoded);
        // console.log('Decoded OTP:', decoded.otp);

        // console.log('Type of decoded.otp:', typeof decoded.otp);
        // console.log('Type of received otp:', typeof otp);


        if (decoded.otp !== Number(otp)) {
            throw new ApiError(401, "Invalid OTP");
        }

        if (Date.now() > req.user.otpExpires) {
            throw new ApiError(401, "OTP has expired");
        }

        // OTP is valid, clear the OTP token and expiration
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    isVerified: true
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new ApiError(500, "Failed to update user after OTP verification");
        }

        const newUpdatedUser = await User.findById(req.user._id).select("-password");

        const { generatedAccessToken, generatedRefreshToken } = await generateAccessAndRefreshToken(updatedUser._id);
        console.log("Access Token:", generatedAccessToken);
        console.log("Refresh Token:", generatedRefreshToken);

        const options = {
            httpOnly: true,
            // maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", generatedAccessToken, options)
            .cookie("refreshToken", generatedRefreshToken, options)
            .json(
                new ApiResponse(200, newUpdatedUser, "OTP verified successfully")
            );
    } catch (error) {
        console.error('OTP verification error:', error.message);
        throw new ApiError(401, error.message || 'Invalid or expired OTP');
    }
});

const logoutUser = asyncHandler(
    async (req, res) => {
        if (!req.user) {
            return res.status(400)
                .json(
                    new ApiResponse(
                        404,
                        {},
                        "User not logged In"
                    )
                )
        }

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );

        const Options = {
            httpOnly: true,
            secure: true,
            maxAge: 0
        }

        return res.status(200)
            .cookie("accessToken", "", Options)
            .cookie("refreshToken", "", Options)
            .cookie("otpToken", "", Options)
            .json(
                new ApiResponse(
                    200, {}, "User Logged Out"
                )
            )
    }
);

const updateUser = asyncHandler(async (req, res) => {
    const { semester, contact } = req.body;

    if ([semester, contact].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.semester = semester;
    user.contact = contact;

    if (req.file) {
        const avatarUrl = await uploadToS3(
            req.file.path,
            req.file.originalname,
            req.file.mimetype
        );
        user.avatar = avatarUrl;
    }

    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );

    if (!updatedUser) {
        throw new ApiError(500, "Failed to fetch updated user");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});


const changeUserCurrentPassword = asyncHandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
        return res.status(400).json({
            success: false,
            message: "Both old and new passwords are required",
        });
    }

    if (oldpassword === newpassword) {
        return res.status(400).json({
            success: false,
            message: "Old and new passwords cannot be the same",
        });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldpassword);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Old password is incorrect",
        });
    }

    user.password = newpassword;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});


const getCurrectUser = asyncHandler(
    async (req, res) => {
        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    req.user,
                    "Current User Fetched Successfully"
                )
            )
    }
);

const getAllUsers = asyncHandler(
    async (req, res) => {
        const users = await User.find().select("-password -refreshToken");
        return res.status(200).json(
            new ApiResponse(
                200,
                users,
                "All users fetched successfully"
            )
        );
    }
);

const deleteUser = asyncHandler(
    async (req, res) => {
        const userId = req.params.id;

        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "User deleted successfully"
            )
        );
    }
);

export {
    userLogin,
    registerUser,
    logoutUser,
    generateOTPToken,
    verifyOTP,
    changeUserCurrentPassword,
    updateUser,
    getCurrectUser,
    getAllUsers,
    deleteUser
};