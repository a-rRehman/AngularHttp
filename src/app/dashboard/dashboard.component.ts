import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Model/task";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  createTask(data: Task) {
    const headers = new HttpHeaders({ my_headers: "HelloWorld" });
    console.log("Dashboard", data);
    this.http
      .post<{ name: string }>(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json",
        data,
        {
          headers: headers,
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.fetchAlltasks();
      });
  }
  deleteRecord(id: string | undefined) {
    this.http
      .delete(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json"
      )
      .subscribe((response) => {
        console.log(response);
        this.fetchAlltasks();
      });
  }
  deleteAllRecords() {
    this.http
      .delete(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json"
      )
      .subscribe((response) => {
        console.log(response);
        this.fetchAlltasks();
      });
  }
  fetchTasks() {
    this.fetchAlltasks();
  }
  fetchAlltasks() {
    this.http
      .get<{ [key: string]: Task }>(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json"
      )
      .pipe(
        map((response) => {
          //Transform Data
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        })
      )
      .subscribe((tasks) => {
        this.allTasks = tasks;
      });
  }
  ngOnInit(): void {
    this.fetchAlltasks();
  }
}
