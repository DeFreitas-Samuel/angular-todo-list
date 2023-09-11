import { TaskListType } from './enums/taskListType.enum';
import { Task } from './task';
import { ulid } from 'ulidx';

export class TaskList {
  id: string;
  name: string;
  createdDate: Date = new Date();
  tasks: Task[];
  type: TaskListType;

  constructor(
    name: string,
    tasks: Task[],
    taskListType: TaskListType,
    id?: string
  ) {
    this.id = id ? id : ulid();
    this.name = name;
    this.tasks = tasks;
    this.type = taskListType;
  }
}
