import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Model/task";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TaskService } from "../Services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  createTask(data: Task) {
    this.taskService.CreateTask(data);
  }
  deleteRecord(id: string | undefined) {
    this.taskService.deleteRecord(id);
  }
  deleteAllRecords() {
    this.taskService.deleteRecords();
  }

  fetchTasks() {
    this.fetchAlltasks();
  }
  fetchAlltasks() {
    this.taskService.GetAlltasks().subscribe((tasks) => {
      this.allTasks = tasks;
    });
  }
  ngOnInit(): void {
    this.fetchAlltasks();
  }
}
