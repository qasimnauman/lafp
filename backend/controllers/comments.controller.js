import { Comments } from "../models/comments.model.js";
import ApiError from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import mongoose from "mongoose";

const getComments = asyncHandler(async (req, res) => {
    const { item } = req.params;

    if (!mongoose.Types.ObjectId.isValid(item)) {
        return res.status(400).json({
            success: false,
            message: "Invalid item ID",
        });
    }

    try {
        const comments = await Comments.aggregate([
            {
                $match: { item: new mongoose.Types.ObjectId(item) },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "postedBy",
                },
            },
            {
                $unwind: "$postedBy",
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    "postedBy._id": 1,
                    "postedBy.fullName": 1,
                    "postedBy.avatar": 1,
                },
            },
        ]);

        return res.status(200).json(
            new ApiResponse(200, "Comments retrieved successfully", comments)
        );
    } catch (err) {
        console.error("Error in getComments:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
});

const addComment = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ success: false, message: "Invalid item ID" });
  }

  // Step 1: Create comment
  const createdComment = await Comments.create({
    content,
    postedBy: userId,
    item: itemId,
  });

  // Step 2: Run aggregation to get populated result
  const commentWithUser = await Comments.aggregate([
    {
      $match: { _id: createdComment._id },
    },
    {
      $lookup: {
        from: "users",
        localField: "postedBy",
        foreignField: "_id",
        as: "postedBy",
      },
    },
    {
      $unwind: "$postedBy",
    },
    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,
        "postedBy._id": 1,
        "postedBy.fullName": 1,
        "postedBy.avatar": 1,
      },
    },
  ]);

  if (!commentWithUser.length) {
    return res.status(404).json({ success: false, message: "Comment not found after creation" });
  }

  return res.status(201).json(
    new ApiResponse(201, "Comment created", commentWithUser[0])
  );
});

export {
    getComments,
    addComment
}