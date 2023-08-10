import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { GetAllTasks, GetTaskList, GetTask } from "../actions/tasks.action";
import { TaskList } from "src/models/taskList";

export type TaskStateModel = {
    tasks: TaskList[]
}

@State<TaskStateModel>({
    name: 'appstate',
    defaults: {
        tasks: []
    }
})

@Injectable()
export class AppState {
    constructor() { }

    @Selector()
    static selectStateData(state:TaskStateModel){
        return state.tasks;
    }

    @Action(GetAllTasks)
    getDataFromState(ctx: StateContext<TaskStateModel>) {
        return;/**  this._du.fetchUsers().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                users: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
            })
        }))*/
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