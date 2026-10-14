import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as TaskModel from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/tasks'; // Adjust the URL as needed

  getAllTasks() {
    return this.http.get<TaskModel.TaskListResponse>(this.apiUrl);
  }

  getTaskById(taskId: string) {
    return this.http.get<TaskModel.TaskDetailResponse>(`${this.apiUrl}/${taskId}`);
  }

  createTask(taskData: TaskModel.CreateTaskDto) {
    return this.http.post<TaskModel.TaskDetailResponse>(this.apiUrl, taskData);
  }

  updateTask(taskId: string, taskData: TaskModel.UpdateTaskDto) {
    return this.http.patch<TaskModel.TaskDetailResponse>(`${this.apiUrl}/${taskId}`, taskData);
  }

  deleteTask(taskId: string) {
    return this.http.delete<TaskModel.TaskDeleteResponse>(`${this.apiUrl}/${taskId}`);
  }
}
