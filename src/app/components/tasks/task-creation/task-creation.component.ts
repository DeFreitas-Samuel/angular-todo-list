import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {priority} from 'src/models/enums/priority.enum';
import {Task} from 'src/models/task';
import {Router} from '@angular/router';
import {taskFormValue} from "../../../../models/taskFormValue.type";
import {AddTask} from 'src/app/shared/actions/tasks.action';
import {Store} from '@ngxs/store';
import {TaskList} from 'src/models/taskList';
import {SimplifiedTaskList} from "../../../../models/SimplifiedTaskList.type";

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})

export class TaskCreationComponent implements OnInit {

  public taskLists:SimplifiedTaskList[] = [];

  public priorities: string[] = Object.values(priority);

  public taskForm = this.fb.nonNullable.group({
    title: this.fb.control('', [Validators.required]),
    dueDate: this.fb.control('', [Validators.required]),
    priority: this.fb.control(priority.Medium, [Validators.required]),
    taskList: this.fb.control('', [Validators.required])
  });

  constructor(private fb: FormBuilder, private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.bootstrap()
  }

  private bootstrap(): void {
    this.taskLists = this.getTaskLists();
  }

  public get priority(): typeof priority {
    return priority;
  }

  public onCreateTask(): void {
    const newTask = this.convertFormValueToTask(this.taskForm.getRawValue());
    this.store.dispatch(new AddTask(this.taskForm.value.taskList!, newTask));
    this.taskForm.reset();
    this.router.navigate(['/']);

  }

  private convertFormValueToTask(formValue: taskFormValue): Task {

    if (formValue.title && formValue.dueDate && formValue.priority) {
      const formTitle: string = formValue?.title;
      const formDueDate: Date = new Date(formValue?.dueDate);
      const formPriority: priority = formValue?.priority;
      return new Task(formTitle, formDueDate, formPriority, false, []);
    } else {
      throw new Error("Invalid form value. Title, due date, and priority are required.");
    }

  }

  private getTaskLists():SimplifiedTaskList[] {

    const currentTasks: TaskList[] = this.store.selectSnapshot<TaskList[]>(state => {
      return state.appState.tasks
    })
    return currentTasks.map((taskList: TaskList) => {
      return {
        taskListId: taskList.id,
        taskListName: taskList.name
      }
    });
  }


}
