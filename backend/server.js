import express from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Post from "./models/Post.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();

//Connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Datebase Connected!"))
.catch((e) => console.log(e));

//Middlewares
app.use(express.json());

//Cors
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};
app.use(cors(corsOptions));

//Create a post
app.post("/api/v1/posts/create", asyncHandler(async(req, res) => {
    const { title, description } = req.body;
    const postFound = await Post.findOne({title});
    if(postFound){
        throw new Error('Post already exists!');
    }
    const postCreated = await Post.create({ title, description });
    res.json({
        status: 'success',
        message: 'Post created successfully!',
        postCreated
    })
}));
//List posts
app.get('/api/v1/posts', asyncHandler(async(req, res) => {
    const posts = await Post.find();
    res.json({
        status: "Success",
        message: "Posts fetched successfully!",
        posts,
    })
}));
//Update posts
app.put('/api/v1/posts/:postId', asyncHandler(async(req ,res ) => {
    //get the post id from params
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    if(!postFound) {
        throw new Error("Post not found!");
    }
    const postUpdated = await Post.findByIdAndUpdate(postId, {
        title: req.body.title,
        description: req.body.description,
    }, {new: true});
    res.json({
        status: "Post updated successfully!",
        postUpdated
    });
}));
//Get single post to update
app.get('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    res.json({
        status: "Post fetched successfully!",
        postFound
    })
}))

//Delete post
app.delete('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.json({
        status: "success",
        message: "Post deleted successfully!",
    })
}));

//Not found handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found on server!'
    })
})

//Error Handling middleware
app.use((err, req, res, next) => {
    const message = err.message;
    const stack = err.stack;
    res.status(500).json({
        message,
        stack
    })
})

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
