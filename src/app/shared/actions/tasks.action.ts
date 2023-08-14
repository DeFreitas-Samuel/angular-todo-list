export class AddTaskList {
  static readonly type = '[TaskList] Add';

  constructor(public taskList: any) {
  }
}

export class AddTask {
  static readonly type = '[Task] Add';

  constructor(public taskListId: any, public task: any) {
  }
}

export class FlipTaskDoneStatus {
  static readonly type = '[Task] Add';
}

export class UpdateTask {
  static readonly type = '[Task] Update';
  // constructor(public payload: any, public id: number, public i:number) { }
}

export class UpdateTaskList {
  static readonly type = '[TaskList] Update';
  // constructor(public payload: any, public id: number, public i:number) { }
}

export class DeleteTask {
  static readonly type = '[Users] Delete';
  //constructor(public id: number) { }
}
