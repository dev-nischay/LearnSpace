import { Router } from "express";
const courseRouter = Router();
import { Validate } from "../middlewares/validator.js";
import {
  createCourseSchema,
  updateCourseSchema,
  urlValidator,
} from "../validation/zod-schema.js";
import asyncHandler from "express-async-handler";
import {
  createCourse,
  publishCourse,
  updateCourse,
  delCourse,
  getAllCourse,
} from "../controllers/course-controller.js";

courseRouter.post(
  "/",
  Validate(createCourseSchema),
  asyncHandler(createCourse)
);
courseRouter
  .route("/:id")
  .put(
    Validate(urlValidator, "params"),
    Validate(updateCourseSchema),
    asyncHandler(updateCourse)
  )
  .patch(Validate(urlValidator, "params"), asyncHandler(publishCourse))
  .delete(Validate(urlValidator, "params"), asyncHandler(delCourse))
  .get((Validate(urlValidator, "params"), asyncHandler(getAllCourse)));

export default courseRouter;
