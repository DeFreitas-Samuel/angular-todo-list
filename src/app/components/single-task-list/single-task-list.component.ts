import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskList } from '../../../models/taskList';
import { Store } from '@ngxs/store';
import { AppState } from '../../shared/states/tasks.state';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-task-list',
  templateUrl: './single-task-list.component.html',
  styleUrls: ['./single-task-list.component.scss'],
})
export class SingleTaskListComponent implements OnInit, OnChanges {
  taskId!: string;
  taskList!: TaskList;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnChanges(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.route.paramMap
      .pipe(
        map((param) => param.get('id')),
        tap((taskListParamId: string | null) => {
          if (taskListParamId) {
            this.taskId = taskListParamId;
          }
        }),
        switchMap(() =>
          this.store
            .select(AppState.getSpecificTaskList)
            .pipe(map((filterFn) => filterFn(this.taskId)))
        )
      )
      .subscribe((taskList: TaskList) => {
        this.taskList = taskList;
      });
  }
}
