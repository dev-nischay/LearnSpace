import { Course } from "../models/course.js";
import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Purchases } from "../models/purchasedCourses.js";
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

export const purchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;
  const courseId = req.validatedParams.id;

  let course = await Course.findOne({ _id: courseId });
  if (!course) {
    return next(new AppError("Course not found", HttpStatus.NotFound));
  }

  await Purchases.create({
    courseId,
    userId,
    creatorId: course.createdBy,
  });

  res.status(HttpStatus.Ok).json({
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

  const purchases = await Purchases.find({ userId })
    .select("-_id -__v -userId")
    .populate({
      path: "courseId",
      select: "-_id -__v -_isPublished ",
    })
    .populate({ path: "creatorId", select: "-_id -__v  -password" });
  if (purchases.length === 0) {
    return next(new AppError("No Purchases", HttpStatus.NotFound));
  }

  res.status(HttpStatus.Ok).json({
    status: true,
    purchases,
  });
};
