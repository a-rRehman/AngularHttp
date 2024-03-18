import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Model/task";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  createTask(data: Task) {
    console.log("Dashboard", data);
    this.http
      .post(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json",
        data
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
