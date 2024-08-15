import express from "express";
import dotenv from "dotenv";
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
app.post("/api/v1/posts/create", async(req, res) => {
    try {
        const postData = req.body;
        const postCreated = await Post.create(postData);
        res.json({
            status: 'success',
            message: 'Post created successfully!',
            postCreated
        })
    } catch (error) {
        res.json(error)
    }
});
//List posts
app.get('/api/v1/posts', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json({
            status: "Success",
            message: "Posts fetched successfully!",
            posts,
        })
    } catch (error) {
        res.json(error);
    }
});
//Update posts
app.put('/api/v1/posts/:postId', async(req ,res ) => {
    try {
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
    } catch (error) {
        throw new Error(error);
    }
});
//Get single post to update
app.get('/api/v1/posts/:postId', async (req, res) => {
    try {
        //get the post id from params
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status: "Post fetched successfully!",
            postFound
        })
    } catch (error) {
        throw new Error(error);
    }
})

//Delete post
app.delete('/api/v1/posts/:postId', async (req, res) => {
    try {
        //get the post id from params
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully!",
        })
    } catch (error) {
        throw new Error(error);
    }
})

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
