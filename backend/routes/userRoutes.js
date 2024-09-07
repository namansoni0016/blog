import express from "express";
import UserController from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/auth/google", UserController.googleAuth);
userRouter.get("/auth/google/callback", UserController.googleAuthCallback);
userRouter.get("/checkAuthenticated", UserController.checkAuthenticated);
userRouter.post("/logout", UserController.logout);
userRouter.get("/profile", isAuthenticated, UserController.profile);

export default userRouter;