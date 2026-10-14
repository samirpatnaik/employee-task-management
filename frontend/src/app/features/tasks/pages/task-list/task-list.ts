import { Component, OnInit, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  readonly tasks = signal<Task[]>([]);
  readonly error = signal<string | null>(null);
  readonly isLoading = signal<boolean>(true);

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks.set(response.data);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(error.error?.message ?? 'An error occurred while fetching tasks.');
        this.isLoading.set(false);
      },
    });
  }
}
