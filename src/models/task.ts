import {priority} from "./enums/priority.enum";

export class Task {
    title:string = "";
    dueDate:Date = new Date();
    priority:priority;
    createdDate: Date = new Date();
    isDone: boolean = false;
    subtasks: Task[] = [];

    public constructor(title:string, dueDate:Date, priority:priority, isDone: boolean, subtasks: Task[]){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdDate = new Date();
        this.isDone = isDone;
        this.subtasks = subtasks;
    }

    public getCreatedDate(){
        
    }
}
