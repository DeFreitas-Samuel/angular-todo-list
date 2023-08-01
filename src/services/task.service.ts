import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {priority} from "src/models/enums/priority.enum";
import { TaskListType } from "src/models/enums/taskListType.enum";
import {Task} from "src/models/task";
import { TaskList } from "src/models/taskList";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: TaskList[] = [new TaskList( "Test",[new Task("Test", new Date(), priority.High, false, [])], TaskListType.Normal)];
    private tasksBehaviorSubject: BehaviorSubject<TaskList[]> = new BehaviorSubject<TaskList[]>(this.tasks);

    addNewTask(taskListId: string, newTask: Task) {
        const taskListIndex = this.findATaskList(taskListId);
        if(taskListIndex > 0 ){
          this.tasks[taskListIndex].tasks.push(newTask);
          this.updateTasks();
        }
    }

    get tasks$() {
        return this.tasksBehaviorSubject.asObservable();
    }

    flipATaskDoneStatus(taskListId: string,taskId: string){
        const taskListIndex = this.findATaskList(taskListId);
        if(taskListIndex > 0 ){

          const idOfTaskToUpdate = this.tasks[taskListIndex].tasks.findIndex((task) => {
            return task.id === taskId;
          })


          if(idOfTaskToUpdate > 0){
            this.tasks[taskListIndex].tasks[idOfTaskToUpdate].isDone = !this.tasks[taskListIndex].tasks[idOfTaskToUpdate].isDone;
            this.updateTasks();
          }
          else{
            console.warn("Task not found");
          }
        }
        else {
          console.warn("Task List not found");
        }

    }

    private findATaskList(taskListId: string){
      return this.tasks.findIndex((taskLists) => {
        return taskLists.id === taskListId;
      })
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
