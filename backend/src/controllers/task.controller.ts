import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

import * as taskService from "../services/task.service";

export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  },
);

export const getAllTasksController = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  },
);

export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(String(req.params.id));
    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  },
);

export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.updateTask(String(req.params.id), req.body);
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  },
);

export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    await taskService.deleteTask(String(req.params.id));
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  },
);
