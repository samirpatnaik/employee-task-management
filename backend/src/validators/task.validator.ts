import { z } from "zod";

export const createTaskSchema = z.strictObject({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(2000, { message: "Description must be at most 2000 characters long" }),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.iso.datetime().optional(),
  employeeId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid employee ID" }),
});

export const updateTaskSchema = z
  .strictObject({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must be at most 100 characters long" })
      .optional(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(2000, {
        message: "Description must be at most 2000 characters long",
      })
      .optional(),
    status: z.enum(["todo", "in-progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.iso.datetime().nullable().optional(),
    employeeId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid employee ID" })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
