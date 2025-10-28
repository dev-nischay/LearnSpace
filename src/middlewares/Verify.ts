import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const creds = req.token?.role;
  if (!creds) {
    return next(new AppError("Unauthorized Acess", 409));
  }

  res.status(200);
  next();
};
