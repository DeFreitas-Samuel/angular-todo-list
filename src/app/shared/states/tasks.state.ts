import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from 'rxjs/operators';
import {TaskList} from "src/models/taskList";
import {Task} from "../../../models/task";
import {priority} from "../../../models/enums/priority.enum";
import {TaskListType} from "../../../models/enums/taskListType.enum";

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

  // @Action(AddUsers)
  // addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
  //     return this._du.addUsers(payload).pipe(tap(returnData => {
  //         const state=ctx.getState();
  //         ctx.patchState({
  //             users:[...state.users,returnData]
  //         })
  //     }))
  // }

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

  // @Action(DeleteUsers)
  // deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
  //     return this._du.deleteUser(id).pipe(tap(returnData => {
  //         const state=ctx.getState();
  //         console.log("The is is",id)
  //         //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
  //         const filteredArray=state.users.filter(contents=>contents.id!==id);

  //         ctx.setState({
  //             ...state,
  //             users:filteredArray
  //         })
  //     }))
  // }
}
