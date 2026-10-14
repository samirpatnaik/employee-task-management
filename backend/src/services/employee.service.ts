import Employee from "../models/employee.model";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dtos/employee.dto";

export const createEmployee = async (employeeData: CreateEmployeeDto) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

export const getAllEmployees = async (
  page: number,
  limit: number,
  search?: string,
  status?: "active" | "inactive",
) => {
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = {};
  if (status) {
    filter.status = status;
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
      { designation: { $regex: search, $options: "i" } },
    ];
  }

  const employees = await Employee.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    employees,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const getEmployeeById = async (id: string) => {
  return await Employee.findById(id);
};

export const updateEmployee = async (
  id: string,
  updateData: UpdateEmployeeDto,
) => {
  return await Employee.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteEmployee = async (id: string) => {
  return await Employee.findByIdAndDelete(id);
};
