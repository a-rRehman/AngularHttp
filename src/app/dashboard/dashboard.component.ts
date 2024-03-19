import { Component, Input, OnInit, inject } from "@angular/core";
import { Task } from "../Model/task";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TaskService } from "../Services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  EditMode: boolean = false;
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  isLoading: boolean = false;
  allTasks: Task[] = [];
  currentTaskId: string = "";
  selectedTask: Task;
  taskService: TaskService = inject(TaskService);
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.EditMode = false;
    this.selectedTask = {
      title: "",
      desc: "",
      assigedTo: "",
      createdAt: "",
      priority: "",
      status: "",
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  createTask(data: Task) {
    if (!this.EditMode) {
      this.taskService.CreateOrUpdateTask(data);
    } else {
      this.updateTask(this.currentTaskId, data);
    }
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
    this.isLoading = true;
    this.taskService.GetAlltasks().subscribe((tasks) => {
      this.allTasks = tasks;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.fetchAlltasks();
  }
  editForm(id: string) {
    this.currentTaskId = id;
    this.showCreateTaskForm = !this.showCreateTaskForm;
    this.EditMode = true;
    this.selectedTask = this.allTasks.find((task) => {
      return task.id === id;
    });
  }
  updateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json",
        data
      )
      .subscribe();
  }
}
