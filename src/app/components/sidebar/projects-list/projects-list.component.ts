import { Component, Input, OnInit } from '@angular/core';
import { TaskListUtilities } from 'src/app/shared/utilities/task-list.utilities';
import { TaskList } from 'src/models/taskList';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @Input() project!: TaskList;
  taskTotalLength: number = 0;
  unfinishedTasksLength: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.taskTotalLength = TaskListUtilities.getTotalTasks(this.project);
    this.unfinishedTasksLength = TaskListUtilities.getTotalUnfinishedTasks(this.project);
  }

}
