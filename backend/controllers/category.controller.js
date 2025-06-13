import { Category } from "../models/categories.model.js"
import ApiError from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

const getAllCategories = asyncHandler(
    async (req, res) => {
        const categories = await Category.find().sort({ name: 1 });
        if (!categories || categories.length === 0) {
            throw new ApiError(404, "No categories found");
        }
        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "Categories retrieved successfully",
                    categories
                )
            );
    });

const addCategory = asyncHandler(
    async (req, res) => {
        const { name, description } = req.body;
        if (
            [name, description].some((f) => f.trim() === "")
        ) {
            throw new ApiError(400, "Name and description are required");
        }
        const category = await Category.create({ name, description, createdBy: req.user._id });

        if (!category) {
            throw new ApiError(500, "Failed to create category");
        }

        res.status(201)
            .json(
                new ApiResponse(
                    201,
                    "Category created successfully",
                    category
                )
            );
    }
);

export {
    getAllCategories,
    addCategory
}