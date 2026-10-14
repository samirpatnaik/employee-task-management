export interface CreateTaskDto {
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
  employeeId: string; // Assuming employeeId is a string representation of ObjectId
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "todo" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string | null; // Assuming dueDate is a string representation of Date
  employeeId?: string; // Assuming employeeId is a string representation of ObjectId
}
