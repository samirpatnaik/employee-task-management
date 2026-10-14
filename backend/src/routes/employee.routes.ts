import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import validateRequest from "../middleware/validate.middleware";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validators/employee.validator";
import { employeeQuerySchema } from "../validators/employee-query.validator";

const router = Router();

router.post(
  "/",
  validateRequest(createEmployeeSchema, "body"),
  employeeController.createEmployee,
);
router.get(
  "/",
  validateRequest(employeeQuerySchema, "query"),
  employeeController.getAllEmployees,
);
router.get("/:id", employeeController.getEmployeeById);
router.patch(
  "/:id",
  validateRequest(updateEmployeeSchema, "body"),
  employeeController.updateEmployee,
);
router.delete("/:id", employeeController.deleteEmployee);
export default router;
