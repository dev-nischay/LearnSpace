import { Router } from "express";
export const userRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { authSchema } from "../validation/auth-schema.js";
import { urlValidator } from "../validation/course-schema.js";
import asyncHandler from "express-async-handler";
import {
  userRegister,
  userLogin,
  purchase,
  userPurchases,
  availableCourses,
} from "../controllers/user-controller.js";
import { auth } from "../middlewares/auth.js";
import { Source } from "../types/enums.js";
userRouter.post("/signup", Validate(authSchema), asyncHandler(userRegister));
userRouter.post("/signin", Validate(authSchema), asyncHandler(userLogin));

userRouter.use("/courses", auth);

userRouter.get("/courses", asyncHandler(availableCourses));

userRouter.post(
  "/courses/:id",
  Validate(urlValidator, Source.params),
  asyncHandler(purchase)
);

userRouter.get("/purchases", auth, asyncHandler(userPurchases));
