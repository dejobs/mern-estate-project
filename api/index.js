import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected live to mongoDB server!"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json())


app.listen(3005, () => {
  console.log("server is running on port 3005. Thank you");
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter )

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})