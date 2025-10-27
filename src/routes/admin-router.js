import { Router } from "express";
const adminRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { signInSchema, signUpSchema } from "../validation/zod-schema.js";
import { register, login } from "../controllers/admin-controller.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middlewares/auth.js";
import courseRouter from "./course-router.js";
import { isAdmin } from "../middlewares/auth.js";
adminRouter.post("/signup", Validate(signUpSchema), asyncHandler(register));
adminRouter.post("/signin", Validate(signInSchema), asyncHandler(login));

adminRouter.use("/courses", auth, isAdmin, courseRouter);

export default adminRouter;
