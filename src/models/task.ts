import {priority} from "./enums/priority.enum";

export class Task {
    title:string = "";
    dueDate:string = "";
    priority:priority = priority.Low;
    createdDate: string = "";
    isDone: boolean = false;
    subtasks: Task[] = [];
}
