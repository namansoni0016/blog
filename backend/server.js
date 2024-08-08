import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
