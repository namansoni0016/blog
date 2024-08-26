import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import passport from "./utils/passport-config.js";
import postRouter from "./routes/postsRoutes.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();

//Connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Datebase Connected!"))
.catch((e) => console.log(e));

//Middlewares
app.use(express.json());

//Cors
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};
app.use(cors(corsOptions));

//Passport middleware
app.use(passport.initialize());

//Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//Not found handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found on server!'
    })
})

//Error Handling middleware
app.use((err, req, res, next) => {
    const message = err.message;
    const stack = err.stack;
    res.status(500).json({
        message,
        stack
    })
})

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
