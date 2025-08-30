import "dotenv/config";
import express from "express";
import adminRouter from "./routes/admin-router.js";
import logger from "./middlewares/logger.js";
import { userRouter } from "./routes/user-router.js";
import AppError from "./utils/AppError.js";
import { errorHandler } from "./middlewares/error.js";
import { connectDB } from "./utils/Db-connection.js";
const app = express();
const PORT = process.env.port;
console.log(PORT);

app.use(logger);
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Invalid Route", 404));
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running at port: ${PORT}`);
});
