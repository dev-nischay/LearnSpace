import { Course } from "../models/course.js";
import { Admin } from "../models/admin.js";
import AppError from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import type { createBody } from "../validation/course-schema.js";
import type { Update } from "../types/constants.js";
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, price } = req.validatedBody as createBody;
  const course = await Course.create({
    // add image latere here
    title,
    description,
    price,
    isPublished: false,
    createdBy: req.token.id,
  });

  res.json({
    status: true,
    courseId: course._id, // for now sending ids for testing later will shift to a normal response
  });
};

export const publishCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId = req.validatedParams.id;

  const findCourse = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: req.token.id },
    { $set: { isPublished: true } },
    { new: true }
  );
  if (!findCourse) {
    return next(new AppError("Course Not Found", 404));
  }
  res.status(200).json({
    status: true,
    message: "Course Published",
  });
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId = req.validatedParams.id;
  const update = req.validatedBody as Update;

  const updateData = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: req.token.id },
    { $set: update },
    { new: true }
  );
  if (!updateData) {
    return next(new AppError("Invalid Course Id  Course not found ", 404));
  }

  res.status(200).json({
    status: true,
    message: "Course Updated",
  });
};

export const delCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId = req.validatedParams.id;

  const Delete = await Course.findOneAndDelete(
    {
      _id: courseId,
      createdBy: req.token.id,
    },
    { new: true }
  );

  if (!Delete) {
    return next(
      new AppError(
        `Invalid Course Id 
         Course not found `,
        404
      )
    );
  }

  res.status(200).json({
    status: false,
    message: "Course Deleted",
  });
};

export const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminId = req.token.id;

  const courseCreated = await Course.find({
    $in: { createdBy: adminId },
  }).populate("courseId");

  // this will work after refs are implemented

  res.status(200).json({
    status: true,
    message: "Content Found",
    allcourses: courseCreated,
  });
};
