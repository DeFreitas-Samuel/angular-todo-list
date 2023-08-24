import {Component, Input, OnInit} from '@angular/core';
import {TaskList} from 'src/models/taskList';
import {TaskListUtilities} from 'src/app/shared/utilities/task-list.utilities'

@Component({
  selector: 'app-specific-task-list',
  templateUrl: './specific-task-list.component.html',
  styleUrls: ['./specific-task-list.component.scss']
})
export class SpecificTaskListComponent implements OnInit {

  @Input() taskList!: TaskList;
  taskTotalLength: number = 0;
  unfinishedTasksLength: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.taskTotalLength = TaskListUtilities.getTotalTasks(this.taskList);
    this.unfinishedTasksLength = TaskListUtilities.getTotalUnfinishedTasks(this.taskList);
  }

}
