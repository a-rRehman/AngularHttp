import { HttpClient, HttpParams } from "@angular/common/http";
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
          ".json",
        { observe: "events" }
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
    let headers = new HttpHeaders();
    headers = headers.append("Access-Control-Allow-Origin", "*");
    headers = headers.append("content-type", "application/json");
    let params = new HttpParams().set("page", "2").set("size", "3");
    return this.http
      .get<{ [key: string]: Task }>(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks.json",
        { headers: headers, params: params }
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
  //Not returning obserable.
  // getTaskDetails(id: string | undefined) {
  //   this.http
  //     .get(
  //       "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks/" +
  //         id +
  //         ".json"
  //     )
  //     .pipe(
  //       map((response) => {
  //         let task = {};
  //         task = { ...response, id };
  //         return task;
  //       })
  //     )
  //     .subscribe((task) => {
  //       console.log(task);
  //     });
  // }

  //Returning obserable.
  getTaskDetails(id: string | undefined) {
    return this.http
      .get(
        "https://angualrhttpclient-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json"
      )
      .pipe(
        map((response) => {
          let task = {};
          task = { ...response, id };
          return task;
        })
      );
  }
}
