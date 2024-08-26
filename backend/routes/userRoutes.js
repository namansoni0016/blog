import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

export default userRouter;