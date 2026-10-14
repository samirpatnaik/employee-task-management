export type taskPriority = 'low' | 'medium' | 'high';
export type taskStatus = 'todo' | 'in-progress' | 'completed';

export interface TaskEmployee {
  _id: string;
  name: string;
  email: string;
  department: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: taskStatus;
  priority: taskPriority;
  dueDate?: string | null;
  employeeId: TaskEmployee | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority?: taskPriority;
  dueDate?: string;
  employeeId: string; // Assuming employeeId is a string representation of ObjectId
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: taskStatus;
  priority?: taskPriority;
  dueDate?: string | null; // Assuming dueDate is a string representation of Date
  employeeId?: string; // Assuming employeeId is a string representation of ObjectId
}

export interface TaskListResponse {
  success: boolean;
  data: Task[];
  message: string;
}

export interface TaskDetailResponse {
  success: boolean;
  data: Task;
  message: string;
}

export interface TaskDeleteResponse {
  success: boolean;
  message: string;
}
