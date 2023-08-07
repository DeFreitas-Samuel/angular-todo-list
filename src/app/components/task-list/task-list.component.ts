import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/models/task';
import {priority} from "../../../models/enums/priority.enum";
import { TaskList } from 'src/models/taskList';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  listOfTaskLists$!: Observable<TaskList[]>;


  constructor(private taskService: TaskService) { }

  public ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.listOfTaskLists$ = this.taskService.tasks$;
  }

  public changeTaskToDone(taskListId:string, taskId: string){
    this.taskService.flipATaskDoneStatus(taskListId, taskId);
  }


}
