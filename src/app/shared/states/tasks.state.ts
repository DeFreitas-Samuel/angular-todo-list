import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TaskList} from "src/models/taskList";
import {Task} from "../../../models/task";
import {priority} from "../../../models/enums/priority.enum";
import {TaskListType} from "../../../models/enums/taskListType.enum";
import {AddTask, AddTaskList, DeleteTask, DeleteTaskList, FlipTaskDoneStatus} from "../actions/tasks.action";

export type TaskStateModel = {
  tasks: TaskList[]
}

@State<TaskStateModel>({
  name: 'appState',
  defaults: {
    tasks: [new TaskList("Test", [new Task("Test", new Date(), priority.High, false, [])], TaskListType.Normal, "01H7PM1KJHJ1GR67BM55B95260")]
  }
})

@Injectable()
export class AppState {
  constructor() {
  }

  private static findTaskListIndex(state: TaskStateModel, taskListId: string): number {
    return state.tasks.findIndex((taskLists) => taskLists.id === taskListId);
  }

  private static findTaskIndex(state: TaskStateModel, taskListId: string, taskId: string) {
    const taskListIndex: number = this.findTaskListIndex(state, taskListId);
    const taskIndex: number = state.tasks[taskListIndex].tasks.findIndex((task: Task): boolean => {
      return task.id === taskId
    })
    return {
      taskListIndex: taskListIndex,
      taskIndex: taskIndex
    }
  }

  @Selector()
  static getSpecificTaskList(state: TaskStateModel): Function {
    return (taskListId: string): TaskList => {
      const taskListIndex: number = this.findTaskListIndex(state, taskListId);
      return state.tasks[taskListIndex];
    }
  }

  @Selector()
  static getSpecificTask(state: TaskStateModel): Function {
    return (taskListId: string, taskId: string) => {
      const taskIndexes = this.findTaskIndex(state, taskListId, taskId);
      return state.tasks[taskIndexes.taskListIndex].tasks[taskIndexes.taskIndex];
    }
  }

  @Action(AddTaskList)
  static addTaskList(ctx: StateContext<TaskStateModel>, action: AddTaskList): void {
    const state: TaskStateModel = ctx.getState();
    const newTasks: TaskList[] = state.tasks.slice();
    newTasks.push(action.taskList);
    ctx.patchState({
      tasks: newTasks
    })
  }

  @Action(AddTask)
  static addTask(ctx: StateContext<TaskStateModel>, action: AddTask): void {
    const state: TaskStateModel = ctx.getState();
    const taskListIndex: number = this.findTaskListIndex(state, action.taskListId);
    if (taskListIndex > -1) {
      const newTasks: TaskList[] = state.tasks.slice();
      newTasks[taskListIndex].tasks.push(action.task);
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("The Task List that you tried to add a task to could not be found.")
    }

  }

  @Action(FlipTaskDoneStatus)
  static flipTaskDoneStatus(ctx: StateContext<TaskStateModel>, action: FlipTaskDoneStatus): void {
    const state: TaskStateModel = ctx.getState();
    const taskIndexInfo = this.findTaskIndex(state, action.taskListId, action.taskId);
    if (taskIndexInfo.taskIndex > -1 && taskIndexInfo.taskListIndex > -1) {
      const newTasks: TaskList[] = state.tasks.slice();
      newTasks[taskIndexInfo.taskListIndex].tasks[taskIndexInfo.taskIndex].isDone = !newTasks[taskIndexInfo.taskListIndex].tasks[taskIndexInfo.taskIndex].isDone;
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("That task cannot be found")
    }
  }

  @Action(DeleteTaskList)
  static deleteTaskList(ctx: StateContext<TaskStateModel>, action: DeleteTaskList): void {
    const state: TaskStateModel = ctx.getState();
    const taskListIndex: number = this.findTaskListIndex(state, action.taskListId);
    if (taskListIndex > -1) {
      const newTasks: TaskList[] = state.tasks.slice();
      newTasks.splice(taskListIndex, 1)
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("The Task List that you tried to delete could not be found.")
    }

  }

  @Action(DeleteTask)
  static deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask): void {
    const state: TaskStateModel = ctx.getState();
    const taskIndexInfo = this.findTaskIndex(state, action.taskListId, action.taskId);
    if (taskIndexInfo.taskIndex > -1 && taskIndexInfo.taskListIndex > -1) {
      const newTasks: TaskList[] = state.tasks.slice();
      newTasks[taskIndexInfo.taskListIndex].tasks.splice(taskIndexInfo.taskIndex,1)
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("That task that you're trying to delete cannot be found")
    }

  }


  // @Action(UpdateUsers)
  // updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
  //     return this._du.updateUser(payload, i).pipe(tap(returnData => {
  //         const state=ctx.getState();

  //         const userList = [...state.users];
  //         userList[i]=payload;

  //         ctx.setState({
  //             ...state,
  //             users: userList,
  //         });
  //     }))
  // }


}
