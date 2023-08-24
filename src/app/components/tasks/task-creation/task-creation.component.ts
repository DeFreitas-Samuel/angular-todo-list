import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {priority} from 'src/models/enums/priority.enum';
import {Task} from 'src/models/task';
import {Router} from '@angular/router';
import {taskFormValue} from "../../../../models/taskFormValue.type";
import { AddTask } from 'src/app/shared/actions/tasks.action';
import { Store } from '@ngxs/store';
import { TaskList } from 'src/models/taskList';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})

export class TaskCreationComponent implements OnInit{

  public taskLists: {id: string, name:string}[] = [];

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.nonNullable.group({
    title: this.fb.control('', [Validators.required]),
    dueDate: this.fb.control('', [Validators.required]),
    priority: this.fb.control(priority.Medium,  [Validators.required]),
    taskList: this.fb.control('', [Validators.required])
  });

  constructor(private fb: FormBuilder, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.bootstrap()
  }

  private bootstrap():void {
    this.getTaskLists();
  }

  public get priority(): typeof priority {
    return priority;
  }

  public onCreateTask():void {
    const newTask = this.convertFormValueToTask(this.taskForm.getRawValue());
    this.store.dispatch(new AddTask( this.taskForm.value.taskList!, newTask ) );
    this.taskForm.reset();
    this.router.navigate(['/']);

  }

  private convertFormValueToTask(formValue: taskFormValue): Task {

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
  private getTaskLists():void{

    const currentTasks = this.store.selectSnapshot<TaskList[]>( state => {
      return state.appState.tasks
    })

    const entireState = this.store.selectSnapshot(state => state);
    console.log("Entire state", entireState);
    console.log("Current Tasks" ,currentTasks);
    currentTasks.map((taskList) => {
      const taskListSimplified = {
        id: taskList.id,
        name: taskList.name
      }
      this.taskLists.push(taskListSimplified);
    })
  }



}
