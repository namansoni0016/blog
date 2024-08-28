import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/auth/google", UserController.googleAuth);
userRouter.get("/auth/google/callback", UserController.googleAuthCallback);

export default userRouter;