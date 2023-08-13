import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from 'rxjs/operators';
import {GetAllTasks, GetTaskList, GetTask} from "../actions/tasks.action";
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


  @Selector()
  static getSpecificTaskList(state: TaskStateModel) {
    return (taskListId: string) => {
      const taskListIndex: number = state.tasks.findIndex((taskLists) => taskLists.id === taskListId);
      return state.tasks[taskListIndex];
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
