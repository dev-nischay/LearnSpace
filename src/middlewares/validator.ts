import AppError from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { Source } from "../types/enums.js";
import { targetMap } from "../types/enums.js";
export const Validate = (schema: ZodType, source: Source = Source.body) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data: Source = req[source];
    console.log(`Source - ${source}`);
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      let errors = parsedData?.error?.issues.map((e) => e.message);
      console.log(errors);
      return next(new AppError(errors, 400));
    }

    if (source === Source.body) {
      req[targetMap.body] = parsedData.data;
    } else if (source === Source.params) {
      req[targetMap.params] = parsedData.data as { id: string };
    } else {
      req[targetMap.query] = parsedData.data;
    }
    console.log(`Validation ✅`);
    next();
  };
};
