import {priority} from "./enums/priority.enum";
import { ulid } from "ulidx";


export class Task {
    id:string = ulid();
    title:string = "";
    dueDate:Date = new Date();
    priority:priority;
    createdDate: Date = new Date();
    isDone: boolean = false;
    description: string = "";
    completedTime: Date|null = null;
    completionTime: Date|null = null;
    expectedTime: string|null= null;
    subtasks: Task[] = [];

    public constructor(title:string, dueDate:Date, priority:priority, isDone: boolean, subtasks: Task[]){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdDate = new Date();
        this.isDone = isDone;
        this.subtasks = subtasks;
    }

}
