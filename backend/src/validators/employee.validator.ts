import z from "zod";

export const createEmployeeSchema = z.strictObject({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  department: z.string().min(2),
  designation: z.string().min(2),
});

export const updateEmployeeSchema = z.strictObject({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
