import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {priority} from "src/models/enums/priority.enum";
import {Task} from "src/models/task";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [new Task("Test", new Date(), priority.High, false, [])];
    private tasksBehaviorSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

    addNewTask(newTask: Task) {
        this.tasks.push(newTask);
        this.updateTasks();
    }

    get tasks$() {
        return this.tasksBehaviorSubject.asObservable();
    }

    flipATaskDoneStatus(taskId: string){
        const idOfTaskToUpdate = this.tasks.findIndex((task) => {
          return task.id === taskId;
        })
        if(idOfTaskToUpdate > 0){
          this.tasks[idOfTaskToUpdate].isDone = !this.tasks[idOfTaskToUpdate].isDone;
          this.updateTasks();
        }
    }

    private updateTasks(){
      this.tasksBehaviorSubject.next(this.tasks);
      this.setTaskListInLocalStorage();
    }

    getTaskListFromLocalStorage(){
      const localStorageString  = localStorage.getItem("Tasks");
      if(localStorageString){
        const localStorageObject = JSON.parse(localStorageString);
        if(Array.isArray(localStorageObject)){
          this.tasks = localStorageObject;
          this.updateTasks();
        }
        else {
          console.warn("The data in the local storage is not in the correct format");
          localStorage.removeItem("Tasks");
        }
      }
      else {
        console.warn("There are no tasks to load from the local storage");
      }
    }


    private setTaskListInLocalStorage(){
      try{
        localStorage.setItem("Tasks",JSON.stringify(this.tasks));
      }
      catch(error){
        console.error(error);
      }
    }


}
