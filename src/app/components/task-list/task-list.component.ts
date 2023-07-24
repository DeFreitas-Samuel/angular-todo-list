import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  listOfTasks$!: Observable<Task[]>;


  constructor(private taskService: TaskService) { }

  public ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.listOfTasks$ = this.taskService.tasks$;
  }

}
