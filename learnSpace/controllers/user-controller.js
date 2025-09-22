import { Course } from "../modals/course.js";
import { User } from "../modals/user.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Purchases } from "../modals/purchasedCourses.js";
const secret = process.env.secret;
export const userRegister = async (req, res, next) => {
  const { username, password } = req.validatedBody;

  const existing = await User.findOne({ username });
  if (existing) {
    return next(AppError("User alredy exists", 409));
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

export const userLogin = async (req, res, next) => {
  const { username, password } = req.validatedBody;
  const response = await User.findOne({ username });

  if (!response) {
    return new AppError("User not Found", 404);
  }

  const checkPassword = await bcrypt.compare(password, response.password);

  if (!checkPassword) {
    return next(new AppError("Incorrect Password", 401));
  }

  const token = jwt.sign(
    {
      id: response._id,
    },
    secret
  );

  res.json({
    status: true,
    message: "Sign in succesfull",
    token, // remove this after testing
  });
};

export const availableCourses = async (req, res, next) => {
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

export const purchase = async (req, res, next) => {
  const userId = req.user.id;
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

export const userPurchases = async (req, res, next) => {
  const userId = req.user.id;

  const purchases = await Purchases.find({ userId });
  if (purchases.length === 0) {
    return next(new AppError("No Purchases", 404));
  }
  let ids = purchases.map((e) => e.courseId);

  const purchasedCourses = await Course.find({
    _id: { $in: ids },
  }).select("-_id -isPublished -__v");

  res.status(200).json({
    status: true,
    purchasedCourses,
  });
};

//fix the last route when free
// i think the problem is that we are getting all the courses that user purchased and to get the course info

// completed
