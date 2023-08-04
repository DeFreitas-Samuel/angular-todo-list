import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {priority} from 'src/models/enums/priority.enum';
import {TaskService} from 'src/services/task.service';
import {Task} from 'src/models/task';
import {Router} from '@angular/router';
import {taskFormValue} from "../../../../models/taskFormValue.interface";
@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})

export class TaskCreationComponent implements OnInit{



  public taskLists: {id: string, name:string}[] = [];

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required],
    priority: [priority.Medium,  Validators.required],
    taskList: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.bootstrap()
  }

  private bootstrap() {
    this.getTaskLists();
  }

  public get priority(): typeof priority {
    return priority;
  }

  public onCreateTask() {
    const newTask = this.convertFormValueToTask(this.taskForm.value!);
    this.taskService.addNewTask( this.taskForm.value.taskList!, newTask);
    this.taskForm.reset();
    this.router.navigate(['/']);

  }

  private convertFormValueToTask(formValue: Partial<taskFormValue>): Task {

    if(formValue.title && formValue.dueDate && formValue.priority){
      const formTitle = formValue?.title;
      const formDueDate:Date = new Date(formValue?.dueDate);
      const formPriority: priority = formValue?.priority;
      return new Task(formTitle, formDueDate, formPriority, false, []);
    }
    else {
      throw new Error("Invalid form value. Title, due date, and priority are required.");
    }

  }

  private getTaskLists(){
    this.taskService.tasksSnapshot.map((taskList)=>{
      const taskListSimplified = {
        id: taskList.id,
        name: taskList.name
      }
      this.taskLists.push(taskListSimplified);
    })
  }



}
