import { Course } from "../models/course.js";
import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Purchases } from "../models/purchasedCourses.js";
import type { Response, Request, NextFunction } from "express";
import type { authBody } from "../validation/auth-schema.js";
const secret = process.env.secret;
export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as authBody;

  const existing = await User.findOne({ username });
  if (existing) {
    return next(new AppError("User alredy exists", 409));
  }

  const hashedPass = await bcrypt.hash(password, 8);

  await User.create({
    username,
    password: hashedPass,
  });

  res.status(200).json({
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
    return next(new AppError("User not Found", 404));
  }

  const checkPassword = await bcrypt.compare(password, response.password);

  if (!checkPassword) {
    return next(new AppError("Incorrect Password", 401));
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
  const courses = await Course.find().select("-isPublished -__v");

  if (courses.length === 0) {
    return next(new AppError("no course available to display", 404));
  }

  res.status(200).json({
    status: true,
    courses,
    message: "Available Courses",
  });
};

export const purchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;
  const courseId = req.validatedParams.id;

  let course = await Course.findOne({ _id: courseId });
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  await Purchases.create({
    courseId,
    userId,
    creatorId: course.createdBy,
  });

  res.status(200).json({
    status: true,
    message: `Succesfully Purchased ${course.title}!`,
  });
};

export const userPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;

  const purchases = await Purchases.find({ userId });
  if (purchases.length === 0) {
    return next(new AppError("No Purchases", 404));
  }
  const ids = purchases.map((e) => e.courseId);

  const purchasedCourses = await Course.find({
    _id: { $in: ids },
  }).select("-_id -isPublished -__v");

  res.status(200).json({
    status: true,
    purchasedCourses,
  });
};

// add refs here
//fix the last route when free
// i think the problem is that we are getting all the courses that user purchased and to get the course info

// completed
