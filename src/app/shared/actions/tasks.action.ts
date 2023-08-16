import {TaskList} from "../../../models/taskList";
import {Task} from "../../../models/task";

export class AddTaskList {
  static readonly type = '[TaskList] AddTaskList';

  constructor(public taskList: TaskList) {
  }
}

export class AddTask {
  static readonly type = '[Task] AddTask';

  constructor(public taskListId: string, public task: Task) {
  }
}

export class FlipTaskDoneStatus {
  static readonly type = '[Task] FlipTaskDoneStatus';

  constructor(public taskListId: string, public taskId: string) {
  }
}

export class UpdateTask {
  static readonly type = '[Task] UpdateTask';

  constructor(public taskListId: string, public taskId: string,  public task: Task) {
  }
}

export class UpdateTaskList {
  static readonly type = '[TaskList] UpdateTaskList';

  constructor(public taskListId: string,  public taskList: TaskList) {
  }
}

export class DeleteTask {
  static readonly type = '[Task] DeleteTask';

  constructor(public taskListId: string, public taskId: string) {
  }
}

export class DeleteTaskList {
  static readonly type = '[TaskList] DeleteTaskList';

  constructor(public taskListId: string) {
  }
}
