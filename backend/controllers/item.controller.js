import { Item } from "../models/item.model.js";
import ApiError from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { uploadToS3 } from "../utils/s3_upload.js";
import { sendEmail } from "../utils/sendemail.js";

const createNewItem = asyncHandler(async (req, res) => {
    const {
        itemName,
        category,
        description = "",
        location,
        date,
        hasItem,
        status,
    } = req.body;

    if (
        [itemName, category, location, date, status].some(
            (f) => typeof f !== "string" || f.trim() === ""
        )
    ) {
        throw new ApiError(400, "Missing required fields");
    }

    if (status === "found" && (!req.files || req.files.length === 0)) {
        throw new ApiError(400, "At least one image is required for found items");
    }

    // console.log("Files", req.files)

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            try {
                const s3Url = await uploadToS3(
                    file.path,
                    `items/${Date.now()}-${file.originalname}`,
                    file.mimetype
                );
                imageUrls.push(s3Url);
            } catch (err) {
                console.error("S3 upload failed:", err);
                throw new ApiError(500, "Image upload to S3 failed");
            }
        }
    }

    // console.log("S3 URL", imageUrls)

    const newItem = await Item.create({
        itemName,
        category,
        description,
        location,
        date: new Date(date),
        imageUrls,
        hasItem: status === "found" ? hasItem === "true" || hasItem === true : false,
        status,
        reportedBy: req.user._id,
    });

    // console.log(newItem)

    if (!newItem) {
        throw new ApiError(500, "Failed to create item");
    }

    res.status(201).json(
        new ApiResponse(
            201,
            "Item reported successfully",
            newItem
        )
    );
});

const getAllItems = asyncHandler(async (req, res) => {
    const items = await Item.aggregate([
        { $sort: { createdAt: -1 } },

        // Join reportedBy user
        {
            $lookup: {
                from: "users",
                localField: "reportedBy",
                foreignField: "_id",
                as: "reportedBy",
            },
        },
        {
            $unwind: {
                path: "$reportedBy",
                preserveNullAndEmptyArrays: true,
            },
        },

        // Join category
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        },

        // Join each user in claims.user array
        {
            $lookup: {
                from: "users",
                localField: "claims.user",
                foreignField: "_id",
                as: "claimUsers",
            },
        },

        // Project only necessary fields (exclude password)
        {
            $project: {
                itemName: 1,
                description: 1,
                location: 1,
                date: 1,
                status: 1,
                hasItem: 1,
                imageUrls: 1,
                createdAt: 1,
                category: {
                    name: "$category.name",
                    _id: "$category._id",
                },
                reportedBy: {
                    username: "$reportedBy.username",
                    fullName: "$reportedBy.fullName",
                    email: "$reportedBy.email",
                    avatar: "$reportedBy.avatar",
                    department: "$reportedBy.department",
                    semester: "$reportedBy.semester",
                    studentId: "$reportedBy.studentId",
                    contact: "$reportedBy.contact",
                    _id: "$reportedBy._id",
                    createdAt: "$reportedBy.createdAt",
                },
                claims: {
                    $map: {
                        input: "$claims",
                        as: "claim",
                        in: {
                            claimedAt: "$$claim.claimedAt",
                            user: {
                                $let: {
                                    vars: {
                                        userObj: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$claimUsers",
                                                        as: "cu",
                                                        cond: {
                                                            $eq: [
                                                                "$$cu._id",
                                                                "$$claim.user",
                                                            ],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    },
                                    in: {
                                        _id: "$$userObj._id",
                                        username: "$$userObj.username",
                                        fullName: "$$userObj.fullName",
                                        email: "$$userObj.email",
                                        avatar: "$$userObj.avatar",
                                        department: "$$userObj.department",
                                        semester: "$$userObj.semester",
                                        studentId: "$$userObj.studentId",
                                        contact: "$$userObj.contact",
                                        createdAt: "$$userObj.createdAt",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    ]);

    if (!items || items.length === 0) {
        throw new ApiError(404, "No items found");
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Items fetched successfully", items));
});


const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    if (item.reportedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this item");
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json(
        new ApiResponse(200, "Item deleted successfully", null)
    );
});

const claimItem = asyncHandler(async (req, res) => {
    const { id } = req.params;           // Item ID from URL
    const userId = req.user._id;         // Authenticated user ID from JWT

    const item = await Item.findById(id);

    console.log("Item:", item);
    console.log("User:", req.user);

    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    if (item.reportedBy.toString() === userId.toString()) {
        throw new ApiError(403, "You cannot claim your own item");
    }

    const alreadyClaimed = item.claims?.some(
        (claim) => claim.user.toString() === userId.toString()
    );

    if (alreadyClaimed) {
        throw new ApiError(400, "You have already claimed this item");
    }

    item.claims = item.claims || [];
    item.claims.push({
        user: userId,
        claimedAt: new Date(),
        status: "Pending"
    });

    await item.save();

    res.status(200).json(
        new ApiResponse(200, "Item claimed successfully", item)
    );
});

const getClaimedItems = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const claimedItems = await Item.aggregate([
        { $match: { "claims.user": userId } },
        { $sort: { createdAt: -1 } },

        // Extract user's specific claim from claims array
        {
            $addFields: {
                userClaim: {
                    $filter: {
                        input: "$claims",
                        as: "claim",
                        cond: { $eq: ["$$claim.user", userId] },
                    },
                },
            },
        },
        {
            $addFields: {
                claimStatus: { $arrayElemAt: ["$userClaim.status", 0] },
            },
        },

        // Join reportedBy
        {
            $lookup: {
                from: "users",
                localField: "reportedBy",
                foreignField: "_id",
                as: "reportedBy",
            },
        },
        { $unwind: "$reportedBy" },

        // Join category
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: "$category" },

        // Final projection
        {
            $project: {
                itemName: 1,
                description: 1,
                location: 1,
                date: 1,
                status: 1,
                hasItem: 1,
                imageUrls: 1,
                createdAt: 1,
                claimStatus: 1,
                category: {
                    name: "$category.name",
                    _id: "$category._id",
                },
                reportedBy: {
                    username: "$reportedBy.username",
                    fullName: "$reportedBy.fullName",
                    email: "$reportedBy.email",
                    avatar: "$reportedBy.avatar",
                    department: "$reportedBy.department",
                    semester: "$reportedBy.semester",
                    studentId: "$reportedBy.studentId",
                    contact: "$reportedBy.contact",
                    _id: "$reportedBy._id",
                    createdAt: "$reportedBy.createdAt",
                },
            },
        },
    ]);

    res.status(200).json(
        new ApiResponse(200, "Claimed items fetched successfully", claimedItems)
    );
});

const getAllItem = asyncHandler(async (req, res) => {
    const items = await Item.aggregate([
        { $sort: { createdAt: -1 } },

        // Join with Users to get reporter info
        {
            $lookup: {
                from: "users",
                localField: "reportedBy",
                foreignField: "_id",
                as: "reportedBy",
            },
        },
        { $unwind: "$reportedBy" },

        // Join with Categories
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: "$category" },

        // Join with Users for each claim.user
        {
            $lookup: {
                from: "users",
                localField: "claims.user",
                foreignField: "_id",
                as: "claimUsers",
            },
        },

        // Restructure and project fields
        {
            $project: {
                itemName: 1,
                description: 1,
                location: 1,
                date: 1,
                status: 1,
                hasItem: 1,
                imageUrls: 1,
                createdAt: 1,

                category: {
                    name: "$category.name",
                    _id: "$category._id"
                },

                reportedBy: {
                    _id: "$reportedBy._id",
                    username: "$reportedBy.username",
                    fullName: "$reportedBy.fullName",
                    email: "$reportedBy.email",
                    avatar: "$reportedBy.avatar",
                    department: "$reportedBy.department",
                    semester: "$reportedBy.semester",
                    studentId: "$reportedBy.studentId",
                    contact: "$reportedBy.contact",
                    createdAt: "$reportedBy.createdAt"
                },

                claims: {
                    $map: {
                        input: "$claims",
                        as: "claim",
                        in: {
                            claimedAt: "$$claim.claimedAt",
                            status: "$$claim.status",
                            user: {
                                $let: {
                                    vars: {
                                        userObj: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$claimUsers",
                                                        as: "cu",
                                                        cond: {
                                                            $eq: ["$$cu._id", "$$claim.user"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    },
                                    in: {
                                        _id: "$$userObj._id",
                                        username: "$$userObj.username",
                                        fullName: "$$userObj.fullName",
                                        email: "$$userObj.email",
                                        avatar: "$$userObj.avatar",
                                        department: "$$userObj.department",
                                        semester: "$$userObj.semester",
                                        studentId: "$$userObj.studentId",
                                        contact: "$$userObj.contact",
                                        createdAt: "$$userObj.createdAt"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ]);

    if (!items || items.length === 0) {
        throw new ApiError(404, "No items found");
    }

    res.status(200).json(
        new ApiResponse(200, "Items fetched successfully", items)
    );
});

const getAllClaimedItems = asyncHandler(async (req, res) => {
    const claimedItems = await Item.aggregate([
        // Only items that have at least one claim
        { $match: { "claims.0": { $exists: true } } },

        // Unwind claims array to work with individual claims
        { $unwind: "$claims" },

        // Join claimant user
        {
            $lookup: {
                from: "users",
                localField: "claims.user",
                foreignField: "_id",
                as: "claimUser"
            }
        },
        { $unwind: { path: "$claimUser", preserveNullAndEmptyArrays: true } },

        // Join reportedBy user
        {
            $lookup: {
                from: "users",
                localField: "reportedBy",
                foreignField: "_id",
                as: "reportedBy"
            }
        },
        { $unwind: { path: "$reportedBy", preserveNullAndEmptyArrays: true } },

        // Join category
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

        // Final projection for claim table display
        {
            $project: {
                itemId: "$_id",
                itemName: "$itemName",
                description: "$description",
                imageUrls: 1,
                reportedBy: {
                    username: "$reportedBy.username",
                    fullName: "$reportedBy.fullName",
                    email: "$reportedBy.email"
                },
                category: "$category.name",
                claimedAt: "$claims.claimedAt",
                claimStatus: "$claims.status",
                claimant: {
                    _id: "$claimUser._id",
                    fullName: "$claimUser.fullName",
                    email: "$claimUser.email",
                    contact: "$claimUser.contact",
                    phone: "$claimUser.phone", // optional if exists
                },
            }
        },

        // Sort most recent claims first
        { $sort: { claimedAt: -1 } }
    ]);

    res.status(200).json(
        new ApiResponse(200, "Claimed items fetched successfully", claimedItems)
    );
});

const approveClaim = asyncHandler(async (req, res) => {
    const { itemId, userId } = req.body;

    const item = await Item.findOneAndUpdate(
        { _id: itemId, "claims.user": userId },
        {
            $set: {
                "claims.$.status": "Approved",
                "claims.$.claimedAt": new Date()
            }
        },
        { new: true }
    );

    if (!item) {
        throw new ApiError(404, "Claim not found for this item/user");
    }

    res.status(200).json(
        new ApiResponse(200, "Claim approved successfully", item)
    );
});

const rejectClaim = asyncHandler(async (req, res) => {
    const { itemId, userId } = req.body;

    const item = await Item.findOneAndUpdate(
        { _id: itemId, "claims.user": userId },
        {
            $set: {
                "claims.$.status": "Rejected",
                "claims.$.claimedAt": new Date()
            }
        },
        { new: true }
    );

    if (!item) {
        throw new ApiError(404, "Claim not found for this item/user");
    }

    res.status(200).json(
        new ApiResponse(200, "Claim rejected successfully", item)
    );
});

const deleteItembyAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    // Allow only the reporter or an admin to delete
    if (item.reportedBy.toString() !== req.user._id.toString() && !req.user.role.includes("admin")) {
        throw new ApiError(403, "You are not authorized to delete this item");
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, "Item deleted successfully", null));
});


export {
    createNewItem,
    getAllItems,
    deleteItem,
    claimItem,
    getClaimedItems,
    getAllItem,
    getAllClaimedItems,
    approveClaim,
    rejectClaim,
    deleteItembyAdmin
}