import { z } from "zod";
import checkEmpty from "../utils/checkEmpty.js";
//add regex for strong password
export const urlValidator = z.object({
  id: z.string().min(24, "Invalid Id"),
});

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(1, "description cannot be empty")
    .max(50, "Title too long!"),
  description: z.string().min(1, "description cannot be empty"),
  price: z.string().max(5, "Invalid Price"),
  image: z.string().min(20, "Invalid Image Url"),
});

// strict image validation will be added later

export const updateCourseSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
  })
  .refine((data) => checkEmpty(data), {
    message: "Changes cannot be empty",
  });

export const purchaseMultipleCourses = z.object({
  courseIds: z.array(z.string()),
  totalAmount: z.number(),
});

export type createBody = z.infer<typeof createCourseSchema>;
export type updateBody = z.infer<typeof updateCourseSchema>;
export type purchaseBody = z.infer<typeof purchaseMultipleCourses>;
