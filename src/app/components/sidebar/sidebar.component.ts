import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../shared/states/tasks.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskList } from '../../../models/taskList';
import { FormBuilder, Validators } from '@angular/forms';
import { AddTaskList } from 'src/app/shared/actions/tasks.action';
import { TaskListType } from '../../../models/enums/taskListType.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Select(AppState.AllTaskLists) taskLists$!: Observable<TaskList[]>;
  projects!: TaskList[];
  addingList: boolean = false;
  private destroy$ = new Subject<void>();
  createListForm = this.fb.nonNullable.group({
    title: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap() {
    this.taskLists$.pipe(takeUntil(this.destroy$)).subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddList(): void {
    this.addingList = !this.addingList;
  }

  onCreateProject() {
    const nameOfProject = this.createListForm.value.title;
    if (nameOfProject) {
      const newProject = new TaskList(nameOfProject, [], TaskListType.Normal);
      this.store.dispatch(new AddTaskList(newProject));
      this.addingList = false;
      this.createListForm.reset();
    }
  }
}
