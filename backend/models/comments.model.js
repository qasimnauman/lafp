import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    }
}, { timestamps: true });

export const Comments = mongoose.model("Comments", commentSchema);