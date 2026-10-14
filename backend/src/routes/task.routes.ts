import { Router } from "express";
import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import validateRequest from "../middleware/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator";

const router = Router();

router.post(
  "/",
  validateRequest(createTaskSchema, "body"),
  createTaskController,
);
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.patch(
  "/:id",
  validateRequest(updateTaskSchema, "body"),
  updateTaskController,
);
router.delete("/:id", deleteTaskController);

export default router;
