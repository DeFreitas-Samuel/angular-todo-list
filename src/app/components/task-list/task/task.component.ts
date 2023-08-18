import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeleteTask, FlipTaskDoneStatus } from 'src/app/shared/actions/tasks.action';
import { priority } from 'src/models/enums/priority.enum';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() taskListId!: string;
  @Input() task!: Task;

  constructor( private store: Store ) { }
  
  ngOnInit(): void {
  }
  
  public changeTaskToDone(taskListId:string, taskId: string){
    this.store.dispatch(new FlipTaskDoneStatus(taskListId, taskId));
  }

  onDeleteTask(taskListId:string, taskId: string){
    this.store.dispatch(new DeleteTask(taskListId, taskId));
  }

  protected readonly priority = priority;

}
