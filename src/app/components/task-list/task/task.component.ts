import { Component, Input, OnInit } from '@angular/core';
import { priority } from 'src/models/enums/priority.enum';
import { Task } from 'src/models/task';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() taskListId!: string;
  @Input() task!: Task;

  constructor(private taskService: TaskService) { }
  
  ngOnInit(): void {
  }
  
  public changeTaskToDone(taskListId:string, taskId: string){
    this.taskService.flipATaskDoneStatus(taskListId, taskId);
  }

  onDeleteTask(taskListId:string, taskId: string){
    this.taskService.deleteATask(taskListId, taskId);
  }

  protected readonly priority = priority;

}
