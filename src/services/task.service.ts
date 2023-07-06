import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "src/models/task";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [];
    private tasksBehaviorSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

    addNewTask(newTask: Task) {
        this.tasks.push(newTask)
    }

    get tasks$() {
        return this.tasksBehaviorSubject.asObservable();
    }
}