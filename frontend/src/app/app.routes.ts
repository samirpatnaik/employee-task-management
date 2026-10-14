import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employees/pages/employee-list/employee-list').then((m) => m.EmployeeList),
  },
  {
    path: 'employees/new',
    loadComponent: () =>
      import('./features/employees/pages/employee-form/employee-form').then((m) => m.EmployeeForm),
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./features/employees/pages/employee-details/employee-details').then(
        (m) => m.EmployeeDetails,
      ),
  },
  {
    path: 'employees/:id/edit',
    loadComponent: () =>
      import('./features/employees/pages/employee-form/employee-form').then((m) => m.EmployeeForm),
  },
];
