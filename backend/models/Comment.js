import mongoose from "mongoose";

//Schema 
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
}, {
    timestamps: true
})

//Model
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;