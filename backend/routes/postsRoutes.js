import express from "express";
import postsController from "../controllers/postsController.js";
import multer from "multer";
import storage from "../utils/fileUpload.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

//creating multer instance
const upload = multer({ storage}).single('image');

const postRouter = express.Router();

postRouter.post("/create", isAuthenticated, upload, postsController.createPost);
postRouter.get('/', postsController.listPosts);
postRouter.put('/:postId', isAuthenticated, postsController.updatePosts);
postRouter.get('/:postId', postsController.getSinglePost);
postRouter.delete('/:postId', isAuthenticated, postsController.deletePost);

export default postRouter;