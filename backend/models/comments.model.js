import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    }
});

export const Comments = mongoose.model("Comments", commentSchema);