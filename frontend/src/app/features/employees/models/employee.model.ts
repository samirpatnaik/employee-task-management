export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeListResponse {
  success: boolean;
  data: {
    employees: Employee[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface EmployeeDetailsResponse {
  success: boolean;
  data: Employee;
  message: string;
}

export interface EmployeeCreateRequest {
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
}

export interface EmployeeUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  designation?: string;
}
