import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    let statusCode = err.statusCode || 500;

    if (err.isOperational) {
      return res.status(statusCode).json({
        success: false,
        error: err.message,
      });
    }

    console.error("Unexpected Error", err);
    return res.status(statusCode).json({
      success: false,
      error: `Something went wrong: ${err.message}`,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // look later
    });
  } else {
    console.error(`Out of Bounds Error ❗️`);
    console.log(`Error:${err}`);
  }
};
