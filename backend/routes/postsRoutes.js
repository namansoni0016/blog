import express from "express";
import postsController from "../controllers/postsController.js";
import multer from "multer";
import storage from "../utils/fileUpload.js";

//creating multer instance
const upload = multer({ storage}).single('image');

const postRouter = express.Router();

postRouter.post("/create", upload, postsController.createPost);
postRouter.get('/', postsController.listPosts);
postRouter.put('/:postId', postsController.updatePosts);
postRouter.get('/:postId', postsController.getSinglePost);
postRouter.delete('/:postId', postsController.deletePost);

export default postRouter;