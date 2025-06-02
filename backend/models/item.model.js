import mongoose, { mongo, Schema } from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }
    ],
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    // Found Status
    status: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }
}, { timestamps: true });

export const Item = mongoose.model("Items", itemSchema)