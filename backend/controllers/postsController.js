import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

const postsController = {
    //Create a post
    createPost: asyncHandler(async(req, res) => {
        const { description, category } = req.body;
        // Find the category
        const categoryFound = await Category.findById(category);
        if(!categoryFound) {
            throw new Error('Category not found!')
        }
        // Find the user
        const userFound = await User.findById(req.user);
        if(!userFound) {
            throw new Error('User not found!')
        }
        const postCreated = await Post.create({ 
            description, 
            image: req.file, 
            author: req.user,
            category
        });
        //push the post into categories
        categoryFound.posts.push(categoryFound?._id);
        //resave the category
        await categoryFound.save();
        //push the post in the user
        userFound.posts.push(postCreated?._id);
        await userFound.save();
        res.json({
            status: 'success',
            message: 'Post created successfully!',
            postCreated
        })
    }),
    //List posts
    listPosts: asyncHandler(async(req, res) => {
        // Basic Filter
        const { category, title, page=1, limit=10 } = req.query;
        let filter = {};
        if(category) {
            filter.category = category;
        }
        if(title) {
            filter.description = {$regex: title, $options: 'i'};
        }
        console.log(filter);
        const posts = await Post.find(filter).populate('category').sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
        //Total posts
        const totalPosts = await Post.countDocuments(filter);
        res.json({
            status: "Success",
            message: "Posts fetched successfully!",
            posts,
            currentPage: page,
            perPage: limit,
            totalPages: Math.ceil(totalPosts/limit),
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

