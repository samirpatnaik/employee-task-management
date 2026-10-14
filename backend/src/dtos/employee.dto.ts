export interface CreateEmployeeDto {
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
}

export interface UpdateEmployeeDto {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  designation?: string;
  status?: "active" | "inactive";
}
