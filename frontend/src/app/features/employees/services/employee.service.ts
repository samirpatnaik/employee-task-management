import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  EmployeeDetailsResponse,
  EmployeeListResponse,
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
} from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly baseUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(page = 1, limit = 2, search?: string, status?: 'active' | 'inactive') {
    let params: {
      page: number;
      limit: number;
      search?: string;
      status?: 'active' | 'inactive';
    } = {
      page,
      limit,
    };

    if (search) params.search = search;

    if (status) params.status = status;

    return this.http.get<EmployeeListResponse>(this.baseUrl, { params });
  }

  getEmployeeById(employeeId: string) {
    return this.http.get<EmployeeDetailsResponse>(`${this.baseUrl}/${employeeId}`);
  }

  createEmployee(employeeData: EmployeeCreateRequest) {
    return this.http.post<EmployeeListResponse>(this.baseUrl, employeeData);
  }

  updateEmployee(employeeId: string, employeeData: EmployeeUpdateRequest) {
    return this.http.patch<EmployeeUpdateRequest>(`${this.baseUrl}/${employeeId}`, employeeData);
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete<EmployeeDetailsResponse>(`${this.baseUrl}/${employeeId}`);
  }
}
