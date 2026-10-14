import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { of, catchError, finalize } from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'app-employee-details',
  styleUrl: './employee-details.scss',
  templateUrl: './employee-details.html',
})
export class EmployeeDetails {
  private readonly employeeService = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  loading = signal(true);
  error = signal('');
  deleting = signal(false);
  notfound = signal(false);

  constructor() {
    if (this.employeeId === null) {
      this.notfound.set(true);
      this.loading.set(false);
    }
  }
  employeeId = this.route.snapshot.paramMap.get('id') || '';
  employee$ = this.employeeId
    ? this.employeeService.getEmployeeById(this.employeeId).pipe(
        catchError(() => {
          this.error.set('Unable to load employee details. Please try again.');
          return of(null);
        }),
        finalize(() => this.loading.set(false)),
      )
    : of(null);

  onBackToList() {
    this.router.navigate(['/employees']);
  }
  onEditEmployee() {
    if (this.employeeId) {
      this.router.navigate(['/employees', this.employeeId, 'edit']);
    }
  }
  onDeleteEmployee() {
    if (!this.employeeId) {
      return;
    }

    const confirmation = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmation) {
      return;
    }

    this.deleting.set(true);
    this.employeeService
      .deleteEmployee(this.employeeId)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.error.set(error?.error$?.message ?? 'Failed to delete employee. Please try again.');
        },
      });
  }
}
