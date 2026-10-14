import Task from "../models/task.model";
import mongoose from "mongoose";
import Employee from "../models/employee.model";
import type { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { AppError } from "../utils/appError";

export const createTask = async (taskData: CreateTaskDto) => {
  const employeeExists = await Employee.exists({ _id: taskData.employeeId });
  if (!employeeExists) {
    throw new AppError("Employee not found", 404);
  }

  const task = await Task.create({
    ...taskData,
    employeeId: new mongoose.Types.ObjectId(taskData.employeeId),
    dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
  });
  return task;
};

export const getAllTasks = async () => {
  const tasks = await Task.find()
    .populate("employeeId", "name email department")
    .sort({ createdAt: -1 });
  return tasks;
};

export const getTaskById = async (taskId: string) => {
  const task = await Task.findById(taskId).populate(
    "employeeId",
    "name email department",
  );
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const updateTask = async (
  taskId: string,
  taskData: Partial<UpdateTaskDto>,
) => {
  if (taskData.employeeId) {
    const employeeExists = await Employee.exists({
      _id: taskData.employeeId,
    });

    if (!employeeExists) {
      throw new AppError("Employee not found", 404);
    }
  }

  const updateData = {
    ...taskData,
    ...(taskData.employeeId && {
      employeeId: new mongoose.Types.ObjectId(taskData.employeeId),
    }),
    ...(taskData.dueDate !== undefined && {
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
    }),
  };
  const task = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  }).populate("employeeId", "name email department");
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const deleteTask = async (taskId: string) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
