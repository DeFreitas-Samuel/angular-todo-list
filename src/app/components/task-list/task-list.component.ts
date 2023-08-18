import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskList} from 'src/models/taskList';
import {Select} from "@ngxs/store";
import {AppState, TaskStateModel} from "../../shared/states/tasks.state";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Select(AppState) listOfTaskLists$: Observable<TaskStateModel> | undefined;
  listOfTaskLists: TaskList[] | undefined;


  constructor() {
  }

  public ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.listOfTaskLists$?.subscribe(allTaskLists => {
      this.listOfTaskLists = allTaskLists.tasks;
    })


  }

}
