import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import type { Payload } from "../types/constants.js";
const secret = process.env.secret;

const Verify = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret!, (err, payload) => {
      err ? reject(err) : resolve(payload);
    });
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    return next(new AppError("Invalid or missing Authorization header", 401));
  }
  const token = auth.split(" ")[1];

  if (!token || token.length === 0)
    return next(new AppError("Token is missing", 401));

  try {
    const decode = (await Verify(token)) as Payload;

    req.token = decode; // do it to token later
    res.status(200);
    next();
  } catch (error: any) {
    console.error(error.message);
    next(new AppError("Authoization Failed", 500));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const creds = req.token?.role;
  if (!creds) {
    return next(new AppError("Unauthorized Acess", 409));
  }

  res.status(200);
};
