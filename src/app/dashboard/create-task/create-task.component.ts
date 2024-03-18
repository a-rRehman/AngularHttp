import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Task } from "src/app/Model/task";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskdata: EventEmitter<Task> = new EventEmitter<any>();
  OnCloseForm() {
    this.CloseForm.emit(false);
  }
  OnFormSubmit(form: NgForm) {
    this.EmitTaskdata.emit(form.value);
    this.CloseForm.emit(false);
    console.log(form);
  }
}
