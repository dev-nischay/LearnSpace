import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import { HttpStatus } from "../types/enums.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    let statusCode = err.statusCode || HttpStatus.InternalServerError;

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
    return res
      .status(500)
      .json({ error: "Something went Wrong please try again later" });
  }
};
// check the above else condition and fix
