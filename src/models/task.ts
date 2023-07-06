import { priority } from "./enums/priority.enum";

export interface Task {
    name:string;
    dueDate:string;
    priority:priority;
    createdDate: string;
    done: boolean;
    subtasks: Task[];
}