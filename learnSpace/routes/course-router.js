import { Router } from "express";
const courseRouter = Router();
import { Validate } from "../middlewares/validator";
import { signInSchema } from "../validation/zod-schema";
import asyncHandler from "express-async-handler";
import { createCourse } from "../controllers/course-controller";

courseRouter.post(
  "/",
  Validate(createCourseSchema),
  asyncHandler(createCourse)
);
courseRouter
  .route("/courseId")
  .put(
    Validate(urlSchema),
    Validate(updateCourseSchema),
    asyncHandler(updateCourse)
  )
  .patch(Validate(urlSchema), asyncHandler(publishCourse))
  .delete(Validate(urlSchema), asyncHandler(deleteCourse));

export default courseRouter;
