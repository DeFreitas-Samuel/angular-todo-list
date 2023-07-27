import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { priority } from "src/models/enums/priority.enum";
import { Task } from "src/models/task";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [{title:"Test", dueDate:new Date("2019-09-26T07:58"), priority:priority.Medium, isDone:false, createdDate:new Date("2019-09-26T07:58"), subtasks:[]}];
    private tasksBehaviorSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

    addNewTask(newTask: Task) {
        this.tasks.push(newTask)
    }

    get tasks$() {
        return this.tasksBehaviorSubject.asObservable();
    }
}