import { Router } from "express";
const courseRouter = Router();
import { Validate } from "../middlewares/validator.js";
import {
  createCourseSchema,
  updateCourseSchema,
  urlValidator,
} from "../validation/course-schema.js";
import asyncHandler from "express-async-handler";
import {
  createCourse,
  publishCourse,
  updateCourse,
  delCourse,
  getAllCourse,
} from "../controllers/course-controller.js";
import { Source } from "../types/enums.js";
courseRouter.post(
  "/",
  Validate(createCourseSchema),
  asyncHandler(createCourse)
);
courseRouter
  .route("/:id")
  .put(
    Validate(urlValidator, Source.params),
    Validate(updateCourseSchema),
    asyncHandler(updateCourse)
  )
  .patch(Validate(urlValidator, Source.params), asyncHandler(publishCourse))
  .delete(Validate(urlValidator, Source.params), asyncHandler(delCourse));

courseRouter.get("/", asyncHandler(getAllCourse));

export default courseRouter;
