import express from "express";
import postsController from "../controllers/postsController.js";
import multer from "multer";
import storage from "../utils/fileUpload.js";

//creating multer instance
const upload = multer({ storage}).single('image');

const postRouter = express.Router();

postRouter.post("/posts/create", upload, postsController.createPost);
postRouter.get('/posts', postsController.listPosts);
postRouter.put('/posts/:postId', postsController.updatePosts);
postRouter.get('/posts/:postId', postsController.getSinglePost);
postRouter.delete('/posts/:postId', postsController.deletePost);

export default postRouter;