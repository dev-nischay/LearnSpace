import { Course } from "../modals/course.js";
import AppError from "../utils/AppError.js";

export const createCourse = async (req, res, next) => {
  let { title, description, price } = req.validatedBody;

  const Course = await Course.create({
    title,
    description,
    price,
    isPublished: false,
  });

  res.json({
    status: true,
    courseId: Course._id, // for now sending ids for testing later will shift to a normal response
  });
  next();
};

export const publishCourse = async (req, res, next) => {
  let courseId = req.validatedParams;

  const findCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { isPublished: true },
    { new: true }
  );
  if (!findCourse) {
    return next(new AppError("Course Not Found", 404));
  }
  res.status(200).json({
    status: true,
    message: "Course Published!!",
  });
};

export const updateCourse = async (req, res, next) => {
  let courseId = req.validatedParams;
  let update = req.validatedBody;

  let updateData = await Course.findOneAndUpdate(
    { _id: courseId },
    { update },
    { new: true }
  );
  if (!updateData) {
    return next(new AppError("Invalid Course Id \n Course not found ", 404));
  }

  res.status(200).json({
    status: true,
    message: "Course Updated!!!",
  });
};

export const delCourse = async (req, res, next) => {
  let courseId = req.validatedParams;

  let Delete = await Course.findOneAndDelete(
    {
      _id: courseId,
    },
    { new: true }
  );
  if (!Delete) {
    return next(new AppError("Invalid Course Id \n Course not found ", 404));
  }
  res.status(200).json({
    status: false,
    message: "Course Deleted!",
  });
};

export const getAllCourse = async (req, res, next) => {
  let courseId = req.validatedParams;

  const Available = await Course.find({ _id: courseId }, { new: true });
  if (Available.length === 0) {
    return next(new AppError("no courses to display", 400));
  }
  res.status(200).json({
    status: true,
    message: Available,
  });
};
