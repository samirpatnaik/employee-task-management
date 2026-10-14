import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeUpdateRequest, EmployeeCreateRequest } from '../../models/employee.model';
import { finalize } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-employee-form',
  styleUrl: './employee-form.scss',
  templateUrl: './employee-form.html',
})
export class EmployeeForm {
  private readonly fb = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  employeeId = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.employeeId;
  saving = signal(false);
  error = signal('');

  constructor() {
    if (this.employeeId) {
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails() {
    this.employeeService.getEmployeeById(this.employeeId!).subscribe({
      next: (response) => {
        if (response && response.data) {
          const employee = response.data;
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            designation: employee.designation,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching employee details:', error);
      },
    });
  }

  employeeForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    department: ['', [Validators.required, Validators.minLength(2)]],
    designation: ['', [Validators.required, Validators.minLength(2)]],
  });

  onCancel() {
    if (this.isEditMode && this.employeeId) this.router.navigate(['/employees', this.employeeId]);
    else this.router.navigate(['/employees']);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.error.set('');
    this.saving.set(true);
    const formData = this.employeeForm.getRawValue();

    if (this.isEditMode && this.employeeId) {
      this.employeeService
        .updateEmployee(this.employeeId, formData)
        .pipe(finalize(() => this.saving.set(false)))
        .subscribe({
          next: (response) => {
            this.router.navigate(['/employees', this.employeeId]);
          },
          error: (error) => {
            this.error.set(error?.error?.message ?? 'Unable to update employee');
            console.error('Unable to update employee:', error);
          },
        });
    } else {
      this.employeeService
        .createEmployee(formData)
        .pipe(finalize(() => this.saving.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/employees']);
          },
          error: (error) => {
            this.error.set(error?.error?.message ?? 'Unable to create employee');
            console.error('Unable to create employee:', error);
          },
        });
    }
  }
}
