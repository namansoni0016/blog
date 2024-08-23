import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const postsController = {
    //Create a post
    createPost: asyncHandler(async(req, res) => {
        const { description } = req.body;
        const postCreated = await Post.create({ description, image: req.file });
        res.json({
            status: 'success',
            message: 'Post created successfully!',
            postCreated
        })
    }),
    //List posts
    listPosts: asyncHandler(async(req, res) => {
        const posts = await Post.find();
        res.json({
            status: "Success",
            message: "Posts fetched successfully!",
            posts,
        })
    }),
    //Update posts
    updatePosts: asyncHandler(async(req ,res ) => {
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
    }),
    //Get single post to update
    getSinglePost: asyncHandler(async (req, res) => {
        //get the post id from params
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status: "Post fetched successfully!",
            postFound
        })
    }),
    //Delete post
    deletePost: asyncHandler(async (req, res) => {
        //get the post id from params
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully!",
        })
    })
}

export default postsController;

