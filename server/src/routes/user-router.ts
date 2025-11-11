import { Router } from "express";
export const userRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { authSchema } from "../validation/auth-schema.js";
import { purchaseMultipleCourses } from "../validation/course-schema.js";
import asyncHandler from "express-async-handler";
import {
  userRegister,
  userLogin,
  purchaseCourse,
  userPurchases,
  availableCourses,
} from "../controllers/user-controller.js";
import { auth } from "../middlewares/auth.js";

userRouter.post("/signup", Validate(authSchema), asyncHandler(userRegister));
userRouter.post("/signin", Validate(authSchema), asyncHandler(userLogin));

userRouter.use("/courses", auth);

userRouter.get("/courses", asyncHandler(availableCourses));

userRouter.post(
  "/courses/purchase",
  Validate(purchaseMultipleCourses),
  asyncHandler(purchaseCourse)
);

userRouter.get("/purchases", auth, asyncHandler(userPurchases));
