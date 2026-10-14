import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe } from '@angular/common';
import {
  finalize,
  catchError,
  of,
  Subject,
  switchMap,
  startWith,
  merge,
  debounceTime,
  tap,
} from 'rxjs';
import { EmployeeTable } from '../../components/employee-table/employee-table';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  imports: [AsyncPipe, EmployeeTable],
  selector: 'app-employee-list',
  styleUrl: './employee-list.scss',
  templateUrl: './employee-list.html',
})
export class EmployeeList {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  protected readonly Math = Math;

  loading = signal(true);
  error = signal('');
  private readonly refreshEmployee$ = new Subject<void>();
  deletingEmployeeId = signal<string | null>(null);
  search = signal('');
  search$ = toObservable(this.search).pipe(
    debounceTime(300),
    tap(() => this.page.set(1)),
  );
  status = signal<'active' | 'inactive' | ''>('');
  status$ = toObservable(this.status).pipe(tap(() => this.page.set(1)));
  page = signal(1);
  limit = signal(2);
  page$ = toObservable(this.page);

  employees$ = merge(this.refreshEmployee$, this.search$, this.status$, this.page$).pipe(
    startWith(void 0),
    switchMap(() => {
      this.loading.set(true);
      this.error.set('');
      return this.employeeService
        .getAllEmployees(this.page(), this.limit(), this.search(), this.status() || undefined)
        .pipe(finalize(() => this.loading.set(false)));
    }),
    catchError(() => {
      this.error.set('Unable to load employees. Please try again.');
      return of(null);
    }),
  );

  onViewEmployee(employeeId: string) {
    this.router.navigate(['/employees', employeeId]);
  }
  onAddEmployee() {
    this.router.navigate(['/employees/new']);
  }
  onEditEmployee(employeeId: string) {
    this.router.navigate(['/employees', employeeId, 'edit']);
  }

  onDeleteEmployee(employeeId: string) {
    const confirmed = window.confirm('Are you suree to delete??');

    if (!confirmed) return;

    this.deletingEmployeeId.set(employeeId);

    this.employeeService
      .deleteEmployee(employeeId)
      .pipe(finalize(() => this.deletingEmployeeId.set('')))
      .subscribe({
        next: () => {
          console.log('Employee deleted successfully');
          this.refreshEmployee$.next();
        },
        error: (error) => {
          console.error('Unable to delete employee:', error);
        },
      });
  }

  clearFilters() {
    this.search.set('');
    this.status.set('');
    this.page.set(1);
  }
}
