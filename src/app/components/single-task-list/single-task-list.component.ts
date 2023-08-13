import {Component, OnInit} from '@angular/core';
import {TaskList} from "../../../models/taskList";
import {Store} from "@ngxs/store";
import {AppState} from "../../shared/states/tasks.state";
import {map} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-task-list',
  templateUrl: './single-task-list.component.html',
  styleUrls: ['./single-task-list.component.scss']
})
export class SingleTaskListComponent implements OnInit {

  taskId!: string;
  taskList!: TaskList;

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap(): void {
    this.route.paramMap.subscribe(param => {
        const taskListIdParam: string | null = param.get("id");
        if (taskListIdParam) {
          this.taskId = taskListIdParam;
        }
      }
    )
    this.store.select(AppState.getSpecificTaskList).pipe(map(filterFn => filterFn(this.taskId))).subscribe((taskList: TaskList) => {
        this.taskList = taskList;
      }
    )
  }

}
