import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { uploadToS3 } from "../utils/s3_upload.js";

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
            throw new Apierror(400, "Invalid Email");
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
            role: "User"
        });
        console.log(newUser);

        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                createdUser,
                "User created successfully"
            )
        );

    }
);

const userLogin = asyncHandler(
    async (req, res) => {
        const {
            username,
            email,
            password
        } = req.body

        if (
            [username, email, password].some((feild) => feild?.trim() === "")
        ) {
            throw new ApiError(
                400,
                "All Feild are required"
            )
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            throw new ApiError(
                404,
                "User not registered"
            )
        }

        const passwordCheck = await user.isPasswordCorrect(password);

        if (!passwordCheck) {
            throw new ApiError(
                401,
                "Incorrect Password"
            )
        }

        const { generatedAccessToken, generatedRefreshToken } = await generateAccessAndRefreshToken(user._id);

        console.log("Access Token: ", generatedAccessToken);
        console.log("Refresh Token: ", generatedRefreshToken);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", generatedAccessToken, options)
            .cookie("refreshToken", generatedRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, generatedAccessToken,
                        generatedRefreshToken
                    },
                    "User logged in"
                )
            )
    }
);

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
            .json(
                new ApiResponse(
                    200, {}, "User Logged Out"
                )
            )
    }
)

export {
    userLogin,
    registerUser,
    logoutUser
};