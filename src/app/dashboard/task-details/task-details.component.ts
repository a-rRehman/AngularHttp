import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "src/app/Model/task";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent {
  @Output()
  CloseDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();

  OnCloseTaskDetail() {
    this.CloseDetailView.emit(false);
  }

  @Input() currentTask: Task | null = null;
}
