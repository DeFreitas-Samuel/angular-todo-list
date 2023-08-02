import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {priority} from 'src/models/enums/priority.enum';
import {TaskService} from 'src/services/task.service';
import {Task} from 'src/models/task';
import {Router} from '@angular/router';


@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent {

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: [priority.Medium, Validators.required],
    priority: ['',  Validators.required],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) { }

  public get priority(): typeof priority {
    return priority;
  }

  public onCreateTask() {
    console.log(this.taskForm.value);
    const newTask = this.convertFormValueToTask(this.taskForm.value);
    console.log("This is the new task", newTask);
    this.taskService.addNewTask( this.taskService.tasksSnapshot[0].id, newTask);
    this.taskForm.reset();
    this.router.navigate(['/']);

  }

  private convertFormValueToTask(formValue: any): Task {

    const formTitle = formValue?.title;
    const formDueDate = new Date(formValue?.dueDate);
    const formPriority: priority = formValue?.priority;




    return new Task(formTitle, formDueDate, formPriority, false, []);



  }


}
