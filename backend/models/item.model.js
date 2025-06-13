import mongoose from "mongoose";

const ReportedItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            enum: ["Library", "Cafeteria", "Lab", "Other"],
        },
        date: {
            type: Date,
            required: true,
        },
        imageUrls: [
            {
                type: String,
            },
        ],
        hasItem: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            required: true,
            enum: ["lost", "found"],
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comments",
            },
        ],
        claims: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                claimedAt: { type: Date, default: Date.now },
                status: { type: String, required: true }
            }
        ]

    },
    {
        timestamps: true,
    }
);

export const Item = mongoose.model("Items", ReportedItemSchema);
