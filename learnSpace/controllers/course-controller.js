import { Course } from "../modals/course.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
let secret = process.env.secret;

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
  // update a course
};

export const delCourse = async (req, res, next) => {
  // del course
};

export const getAllCourse = async (req, res, next) => {
  // get all the courses
};
