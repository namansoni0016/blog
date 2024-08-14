import express from "express";
import dotenv from "dotenv";
import Post from "./models/Post.js";
import mongoose from "mongoose";
import cors from "cors";
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

//Create a post
app.post("/api/v1/posts/create", async(req, res) => {
    try {
        const postData = req.body;
        const postCreated = await Post.create(postData);
        res.json({
            status: 'success',
            message: 'Post created successfully!',
            postCreated
        })
    } catch (error) {
        res.json(error)
    }
})

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
