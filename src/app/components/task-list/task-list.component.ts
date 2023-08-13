import {Component, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {TaskService} from 'src/services/task.service';
import {Task} from 'src/models/task';
import {priority} from "../../../models/enums/priority.enum";
import {TaskList} from 'src/models/taskList';
import {Select, Store} from "@ngxs/store";
import {AppState, TaskStateModel} from "../../shared/states/tasks.state";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Select(AppState) listOfTaskLists$: Observable<TaskStateModel> | undefined;
  listOfTaskLists: TaskList[] | undefined;


  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.listOfTaskLists$?.subscribe(allTaskLists => {
      this.listOfTaskLists = allTaskLists.tasks;
    })


  }

  /*
    public changeTaskToDone(taskListId:string, taskId: string){
      this.taskService.flipATaskDoneStatus(taskListId, taskId);
    }
  */

}
