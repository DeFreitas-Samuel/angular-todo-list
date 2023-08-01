import { TaskListType } from "./enums/taskListType.enum";
import { Task } from "./task";
import { ulid } from "ulidx";

export class TaskList {
    id:string = ulid();
    name: string;
    createdDate: Date = new Date();
    tasks: Task[];
    type: TaskListType;

    constructor(name: string, tasks: Task[], taskListType: TaskListType){
        this.name = name;
        this.tasks = tasks;
        this.type = taskListType;
    }


    get amountOfTasks(){
        return this.tasks.length;
    }
}