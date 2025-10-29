import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import { HttpStatus } from "../types/enums.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const creds = req.token?.role;
  if (!creds) {
    return next(new AppError("Unauthorized Acess", HttpStatus.Forbidden));
  }

  res.status(200);
  next();
};
