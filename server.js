import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

//ROUTERS
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import problemRouter from "./routes/problemRouter.js";
import submissionRouter from "./routes/submissionRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());



app.use("/api/v2/user", authenticateUser, userRouter);
app.use("/api/v2/auth", authRouter);
app.use("/api/v2/problem", problemRouter);
app.use("/api/v2/submission", submissionRouter);


app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
