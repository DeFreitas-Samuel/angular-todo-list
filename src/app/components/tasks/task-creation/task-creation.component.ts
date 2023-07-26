import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { priority } from 'src/models/enums/priority.enum';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/models/task';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent {

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.group({
    name: [''],
    dueDate: [priority.Medium],
    priority: [''],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) { }

  public onCreateTask() {
    console.log(this.taskForm.value);
    const newTask = this.convertFormValueToTask(this.taskForm.value);
    console.log("This is the new task", newTask);
    this.taskService.addNewTask(newTask);
    this.taskForm.reset();
    this.router.navigate(['/']);

  }

  private convertFormValueToTask(formValue: any): Task {

    const formName = formValue?.name;
    const formDueDate = formValue?.dueDate;
    const formPriority: priority = formValue?.priority;
    const currentDate = (new Date()).toISOString();

    const newTask: Task = { title: formName, dueDate: formDueDate, priority: formPriority, createdDate: currentDate, isDone: false, subtasks: [] }
    return newTask;
  }


}
