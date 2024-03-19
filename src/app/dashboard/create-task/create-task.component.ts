import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Task } from "src/app/Model/task";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent implements AfterViewInit {
  @Input() isEditMode: Boolean = false;
  @Input() selectedTask: Task;
  @ViewChild("taskForm") taskForm: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskdata: EventEmitter<Task> = new EventEmitter<any>();

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.taskForm.value);
      this.taskForm.form.patchValue(this.selectedTask);
    });
  }

  OnCloseForm() {
    this.CloseForm.emit(false);
  }
  OnFormSubmit(form: NgForm) {
    this.EmitTaskdata.emit(form.value);
    this.CloseForm.emit(false);
    console.log(form);
  }
}
