import express from "express";
import postsController from "../controllers/postsController.js";

const postRouter = express.Router();

postRouter.post("/posts/create", postsController.createPost);
postRouter.get('/posts', postsController.listPosts);
postRouter.put('/posts/:postId', postsController.updatePosts);
postRouter.get('/posts/:postId', postsController.getSinglePost);
postRouter.delete('/posts/:postId', postsController.deletePost);

export default postRouter;