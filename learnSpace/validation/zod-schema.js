import { z } from "zod";

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

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const urlValidator = z.object({
  id: z.string().min(24, "Invalid Id"),
});

export const purchaseCourse = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  isPublished: z.string(),
});

// export const updateCourse = z.object({
//   title:z.string(),
//   description:z.string(),
//   price:z.string(),
//   isPublished:z.string()
// }) => use refine  cause these all are optional to update

// publishCourse,delCourse will be validated through url validator as they dont require any body to validate
