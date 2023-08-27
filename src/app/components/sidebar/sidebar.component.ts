import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {AppState} from "../../shared/states/tasks.state";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {TaskList} from "../../../models/taskList";
import {SimplifiedTaskList} from "../../../models/SimplifiedTaskList.type";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Select(AppState.AllTaskLists) taskLists$!: Observable<TaskList[]>;
  taskLists!: SimplifiedTaskList[];
  private destroy$ = new Subject<void>;

  constructor() {
  }

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap() {
    this.taskLists$.pipe(
      map((taskLists: TaskList[]) => {

        return taskLists.map(taskList => {
          return {
            taskListName: taskList.name,
            taskListId: taskList.id
          }
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe(taskListSimplified => {
      this.taskLists = taskListSimplified
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
