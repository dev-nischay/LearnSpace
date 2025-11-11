import { Course } from "../models/course.js";
import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Purchases } from "../models/purchasedCourses.js";
import type { purchaseBody } from "../validation/course-schema.js";
import mongoose, { mongo } from "mongoose";
import type { Response, Request, NextFunction } from "express";
import type { authBody } from "../validation/auth-schema.js";
import { HttpStatus } from "../types/enums.js";
const secret = process.env.secret;
export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as authBody;

  const existing = await User.findOne({ username });
  if (existing) {
    return next(new AppError("User alredy exists", HttpStatus.Forbidden));
  }

  const hashedPass = await bcrypt.hash(password, 8);

  await User.create({
    username,
    password: hashedPass,
  });

  res.status(HttpStatus.Ok).json({
    status: true,
    message: "Account Created!!!",
  });
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as authBody;
  const response = await User.findOne({ username });

  if (!response) {
    return next(new AppError("Account not found", HttpStatus.NotFound));
  }

  const checkPassword = await bcrypt.compare(password, response.password);

  if (!checkPassword) {
    return next(new AppError("Incorrect Password", HttpStatus.BadRequest));
  }

  const token = jwt.sign(
    {
      id: response._id,
    },
    secret as string
  );

  res.json({
    status: true,
    message: "Sign in succesfull",
    token, // remove this after testing
  });
};

export const availableCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courses = await Course.find()
    .select("-isPublished -__v ")
    .populate({ path: "createdBy", select: "-_id -__v -password" });

  if (courses.length === 0) {
    return next(
      new AppError("no course available to display", HttpStatus.NotFound)
    );
  }

  res.status(HttpStatus.Ok).json({
    status: true,
    message: "Available Courses",
    courses,
  });
};

export const userPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;

  const purchases = await Purchases.find({ userId }).populate({
    path: "items.courseId",
    select: "title createdBy",
    populate: {
      path: "createdBy",
      select: "username",
    },
  });

  if (purchases.length === 0) {
    return next(new AppError("No Purchases", HttpStatus.NotFound));
  }

  res.status(HttpStatus.Ok).json({
    status: true,
    purchases,
  });
};

export const purchaseCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;
  const { courseIds, totalAmount } = req.validatedBody as purchaseBody;

  const course = await Course.find({ _id: { $in: courseIds } });

  if (!course) {
    return next(new AppError("Course not found", HttpStatus.NotFound));
  }

  const purchasedCourses = courseIds.map((id) => {
    return {
      courseId: id,
    };
  });

  const payment = await Purchases.create({
    userId,
    totalAmount,
    items: purchasedCourses,
  });

  if (!payment) {
    next(new AppError("Payment Failed try again later ", 402));
  }

  res.status(HttpStatus.Ok).json({
    message: "Payment Successfull",
  });
};
