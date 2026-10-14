import type { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employee.service";
import asyncHandler from "../utils/asyncHandler";

export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  },
);

export const getAllEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, search, status } = res.locals.query;

    const employees = await employeeService.getAllEmployees(
      page,
      limit,
      search,
      status,
    );
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  },
);

export const getEmployeeById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string" || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  },
);

export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const updateData = req.body;
    const updatedEmployee = await employeeService.updateEmployee(
      id,
      updateData,
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  },
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }
    const deletedEmployee = await employeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  },
);
