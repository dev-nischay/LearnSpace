import { Router } from "express";
export const userRouter = Router();
import { Validate } from "../middlewares/validator.js";
import {
  signInSchema,
  signUpSchema,
  urlValidator,
} from "../validation/zod-schema.js";
import asyncHandler from "express-async-handler";
import {
  userRegister,
  userLogin,
  purchase,
  userPurchases,
  availableCourses,
} from "../controllers/user-controller.js";
import { auth } from "../middlewares/auth.js";
userRouter.post("/signup", Validate(signUpSchema), asyncHandler(userRegister));
userRouter.post("/signin", Validate(signInSchema), asyncHandler(userLogin));

userRouter.use("/courses", auth);

userRouter.get("/courses", asyncHandler(availableCourses));

userRouter.post(
  "/courses/:id",
  Validate(urlValidator, "params"),
  asyncHandler(purchase)
);

userRouter.get("/purchases", auth, asyncHandler(userPurchases));
