import { z } from "zod";
import checkEmpty from "../utils/checkEmpty.js";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "username must be 2 characters long")
    .max(16, "username cannot be more than 16 character"),
  password: z
    .string()
    .min(8, "password must be 8 characters long")
    .max(24, "password cannot be more than 16 characters"),
});

//add regex for strong password
export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

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

// user schemas after this
// no schema's for delCourse and publishCourse as they dont require any body but id
