import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserController = {
    register: asyncHandler(async(req, res) => {
        //Checking if the user already exists
        const { username, email, password } = req.body;
        const userFound = await User.findOne({ username, email });
        if(userFound) {
            throw new Error("User already exists!");
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRgistered = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully!',
            userRgistered
        });
    }),
    //Login
    login: asyncHandler(async(req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) return next(err);
            if(!user) {
                return res.status(401).json({ message: info.message });
            }
            const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // For 1 day
            })
            res.json({
                status: 'success',
                message: 'Login Success!',
                username: user?.username,
                email: user?.email,
                _id: user?._id,
            })
        })(req, res, next)
    }),
    //googleAuth : when user clicks sign up or sign in with google and open form to accept consent
    googleAuth: passport.authenticate('google', {scope: ['profile']}),
    //GoogleAuthCallback : trigger the google auth
    googleAuthCallback: asyncHandler(async (req, res, next) => {
        passport.authenticate('google', {
            failureRedirect: '/login',
            session: false,
        }, (err, user, info) => {
            if(err) return next(err);
            if(!user) {
                returnres.redirect('http://localhost:5173/google-login-error')
            }
            //generate token
            const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET, {
                expiresIn: "3d"
            });
            // set the token in the cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });
            // redirect the user to dashboard on client
            res.redirect('http://localhost:5173/dashboard');
        })(req, res, next);
    }),
}

export default UserController;