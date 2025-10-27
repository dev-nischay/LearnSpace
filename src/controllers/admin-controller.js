import bcrypt from "bcrypt";
import { Admin } from "../modals/admin.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
let secret = process.env.secret;

export const register = async (req, res, next) => {
  const { username, password } = req.validatedBody;

  const existing = await Admin.findOne({ username });
  if (existing) {
    return next(new AppError("Admin already exits", 409));
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

export const login = async (req, res, next) => {
  const { username, password } = req.validatedBody;
  const response = await Admin.findOne({ username });
  if (!response) {
    return next(new AppError("Admin not found", 404));
  }
  let hashedPass = await bcrypt.compare(password, response.password);
  if (!hashedPass) {
    return next(new AppError("Incorrect Password", 401));
  }

  const token = jwt.sign(
    {
      id: response._id,
      role: "Admin",
    },
    secret
  );
  //check for role in frontend
  res.json({
    status: true,
    message: "Login Successfull!!",
    token,
  });
};
