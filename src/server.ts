import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import adminRouter from "./routes/admin-router.js";
import logger from "./middlewares/logger.js";
import AppError from "./utils/AppError.js";
import { errorHandler } from "./middlewares/error.js";
import { connectDB } from "./utils/Db-connection.js";
import { userRouter } from "./routes/user-router.js";

const app = express();
const PORT = process.env.port;

app.use(logger);
app.use(express.json());
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Invalid Route", 404));
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running at port: ${PORT}`);
});
