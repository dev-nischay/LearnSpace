import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
const secret = process.env.secret;

const Verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

export const auth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    return next(new AppError("Invalid or missing Authorization header", 401));
  }
  const token = auth.split(" ")[1];

  if (!token) return next(new AppError("Token is missing", 401));

  try {
    const decode = await Verify(token);
    req.user = decode;
    res.status(200);
    next();
  } catch (error) {
    console.error(error.message);
    next(new AppError("Authoization Failed", 500));
  }
};
