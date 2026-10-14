import { Component, input, output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  imports: [],
  selector: 'app-employee-table',
  styleUrl: './employee-table.scss',
  templateUrl: './employee-table.html',
})
export class EmployeeTable {
  employees = input<Employee[]>([]);
  viewEmployee = output<string>();
  editEmployee = output<string>();
  deleteEmployee = output<string>();
  deletingEmployeeId = input<string | null>(null);
}
