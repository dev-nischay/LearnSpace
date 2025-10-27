import { Course } from "../modals/course.js";
import { Admin } from "../modals/admin.js";
import AppError from "../utils/AppError.js";

export const createCourse = async (req, res, next) => {
  const { title, description, price } = req.validatedBody;

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

export const publishCourse = async (req, res, next) => {
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
    message: "Course Published!!",
  });
};

export const updateCourse = async (req, res, next) => {
  const courseId = req.validatedParams.id;
  const update = req.validatedBody;

  const updateData = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: req.token.id },
    { $set: update },
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
  const courseId = req.validatedParams.id;

  const Delete = await Course.findOneAndDelete(
    {
      _id: courseId,
      createdBy: req.token.id,
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
  const adminId = req.token.id;

  const courseCreated = await Course.find({
    $in: { createdBy: adminId },
  }).populate("courseId");
  if (Available.length === 0) {
    return next(new AppError("no courses to display", 400));
  }
  res.status(200).json({
    status: true,
    message: Available,
  });
};
