import bcrypt from "bcrypt";
import { Admin } from "../models/admin.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { authBody } from "../validation/auth-schema.js";
import { HttpStatus } from "../types/enums.js";
const secret = process.env.secret;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as authBody;

  const existing = await Admin.findOne({ username });
  if (existing) {
    return next(new AppError("Admin already exits", HttpStatus.BadRequest));
  }

  let hashedPass = await bcrypt.hash(password, 8);

  await Admin.create({
    username,
    password: hashedPass,
  });
  res.json({
    status: true,
    message: "Admin registered Successfully",
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as authBody;
  const response = await Admin.findOne({ username });
  if (!response) {
    return next(new AppError("Admin not found", HttpStatus.NotFound));
  }
  let hashedPass = await bcrypt.compare(password, response.password);
  if (!hashedPass) {
    return next(new AppError("Incorrect Password", HttpStatus.BadRequest));
  }

  const token = jwt.sign(
    {
      id: response._id,
      role: "Admin",
    },
    secret as string
  );
  //check for role in frontend
  res.json({
    status: true,
    message: "Login Successfull!!",
    token,
  });
};
