import {Component, OnInit} from '@angular/core';
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
interface taskFormValue {
  title: string | null |undefined,
  dueDate: string | null |undefined,
  priority: priority | null |undefined,
  taskList: string | null |undefined
}

export class TaskCreationComponent implements OnInit{



  public taskLists: {id: string, name:string}[] = [];

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: [priority.Medium, Validators.required],
    priority: ['',  Validators.required],
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
    console.log(this.taskForm.value);
    const newTask = this.convertFormValueToTask(this.taskForm.value!);
    console.log("This is the new task", newTask);
    console.log("Before insertion", this.taskService.tasksSnapshot);
    this.taskService.addNewTask( this.taskForm.value.taskList!, newTask);
    console.log("After insertion", this.taskService.tasksSnapshot);
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
