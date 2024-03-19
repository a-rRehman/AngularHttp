import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Model/task";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  CreateOrUpdateTask(task: Task) {
    const headers = new HttpHeaders({ my_headers: "HelloWorld" });
    this.http
      .post<{ name: string }>(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json",
        task,
        {
          headers: headers,
        }
      )
      .subscribe((response) => {
        console.log(response);
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
      });
  }
  deleteRecords() {
    this.http
      .delete(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json"
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  GetAlltasks() {
    return this.http
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
      );
  }
}
