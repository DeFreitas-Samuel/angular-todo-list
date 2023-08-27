import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TaskList} from "src/models/taskList";
import {Task} from "../../../models/task";
import {priority} from "../../../models/enums/priority.enum";
import {TaskListType} from "../../../models/enums/taskListType.enum";
import {AddTask, AddTaskList, DeleteTask, DeleteTaskList, FlipTaskDoneStatus, UpdateTaskList, UpdateTask} from "../actions/tasks.action";

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

  private static arrayDeepCopy<T extends Array<any>>(array: T): T{
    return JSON.parse(JSON.stringify(array));
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
  static AllTaskLists(state: TaskStateModel):TaskList[] {
    return state.tasks;
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
  addTaskList(ctx: StateContext<TaskStateModel>, action: AddTaskList): void {
    const state: TaskStateModel = ctx.getState();
    const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
    newTasks.push(action.taskList);
    ctx.patchState({
      tasks: newTasks
    })
  }

  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTask): void {
    const state: TaskStateModel = ctx.getState();
    const taskListIndex: number = AppState.findTaskListIndex(state, action.taskListId);
    if (taskListIndex > -1) {
      const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
      newTasks[taskListIndex].tasks.push(action.task);
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("The Task List that you tried to add a task to could not be found.")
    }

  }

  @Action(FlipTaskDoneStatus)
  flipTaskDoneStatus(ctx: StateContext<TaskStateModel>, action: FlipTaskDoneStatus): void {
    const state: TaskStateModel = ctx.getState();
    const taskIndexInfo = AppState.findTaskIndex(state, action.taskListId, action.taskId);
    if (taskIndexInfo.taskIndex > -1 && taskIndexInfo.taskListIndex > -1) {
      const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);

      newTasks[taskIndexInfo.taskListIndex].tasks[taskIndexInfo.taskIndex].isDone = !newTasks[taskIndexInfo.taskListIndex].tasks[taskIndexInfo.taskIndex].isDone;
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("That task cannot be found")
    }
  }

  @Action(DeleteTaskList)
  deleteTaskList(ctx: StateContext<TaskStateModel>, action: DeleteTaskList): void {
    const state: TaskStateModel = ctx.getState();
    const taskListIndex: number = AppState.findTaskListIndex(state, action.taskListId);
    if (taskListIndex > -1) {
      const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
      newTasks.splice(taskListIndex, 1)
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("The Task List that you tried to delete could not be found.")
    }

  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask): void {
    const state: TaskStateModel = ctx.getState();
    const taskIndexInfo = AppState.findTaskIndex(state, action.taskListId, action.taskId);
    if (taskIndexInfo.taskIndex > -1 && taskIndexInfo.taskListIndex > -1) {
      const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
      newTasks[taskIndexInfo.taskListIndex].tasks.splice(taskIndexInfo.taskIndex,1)
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("That task that you're trying to delete cannot be found")
    }

  }

  @Action(UpdateTaskList)
  updateTaskList(ctx: StateContext<TaskStateModel>, action: UpdateTaskList): void {
      const state: TaskStateModel = ctx.getState();
      const taskListIndex: number = AppState.findTaskListIndex(state, action.taskListId);
      if (taskListIndex > -1) {
        const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
        newTasks[taskListIndex] = action.taskList;
        ctx.patchState({
          tasks: newTasks
        })
      } else {
        console.warn("That task list that you're trying to update cannot be found")
      }
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, action: UpdateTask): void {
    const state: TaskStateModel = ctx.getState();
    const taskIndexInfo = AppState.findTaskIndex(state, action.taskListId, action.taskId);
    if (taskIndexInfo.taskIndex > -1 && taskIndexInfo.taskListIndex > -1) {
      const newTasks: TaskList[] = AppState.arrayDeepCopy(state.tasks);
      newTasks[taskIndexInfo.taskListIndex].tasks[taskIndexInfo.taskIndex] = action.task;
      ctx.patchState({
        tasks: newTasks
      })
    } else {
      console.warn("That task cannot be found")
    }
  }
}
