import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("Connected live to mongoDB server!")).catch((err) => console.log(err))

const app = express();

app.listen(3005, () => {
  console.log("server is running on port 3005. Thank you");
});
