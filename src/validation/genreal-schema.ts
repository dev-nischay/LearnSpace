import { z } from "zod";
import checkEmpty from "../utils/checkEmpty.js";
//add regex for strong password
export const urlValidator = z.object({
  id: z.string().min(24, "Invalid Id"),
});

export const createCourseSchema = z.object({
  title: z.string().max(24, "Title too long!"),
  description: z.string().min(1, "description cannot be empty"),
  price: z.string().max(5, "Invalid Price"),
});

export const updateCourseSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
  })
  .refine((data) => checkEmpty(data), {
    message: "data cannot be empty",
  });

export type createBody = z.infer<typeof createCourseSchema>;
export type updateBody = z.infer<typeof updateCourseSchema>;
