import { Router } from "express";
const adminRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { authSchema } from "../validation/auth-schema.js";
import { register, login } from "../controllers/admin-controller.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middlewares/auth.js";
import courseRouter from "./course-router.js";
import { isAdmin } from "../middlewares/verify.js";
adminRouter.post("/signup", Validate(authSchema), asyncHandler(register));
adminRouter.post("/signin", Validate(authSchema), asyncHandler(login));

adminRouter.use("/courses", auth, isAdmin, courseRouter);

export default adminRouter;
