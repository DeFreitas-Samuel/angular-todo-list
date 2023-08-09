import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { priority } from "src/models/enums/priority.enum";
import { TaskListType } from "src/models/enums/taskListType.enum";
import { Task } from "src/models/task";
import { TaskList } from "src/models/taskList";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: TaskList[] = [new TaskList( "Test",[new Task("Test", new Date(), priority.High, false, [])], TaskListType.Normal)];
    private tasksBehaviorSubject: BehaviorSubject<TaskList[]> = new BehaviorSubject<TaskList[]>(this.tasks);

    public addNewTask(taskListId: string, newTask: Task):void {
        const taskListIndex:number = this.findATaskListIndex(taskListId);
        if(taskListIndex < 0 ){
          console.warn("Something went wrong");
          return; 
        }
    
        this.tasks[taskListIndex].tasks.push(newTask);
        this.updateTasksBehaviorSubject();
    }

    get tasks$():Observable<TaskList[]> {
        return this.tasksBehaviorSubject.asObservable();
    }

    get tasksSnapshot():TaskList[] {
      return this.tasksBehaviorSubject.value;
    }

    public flipATaskDoneStatus(taskListId: string,taskId: string):void{
        const taskListIndex:number = this.findATaskListIndex(taskListId);

        if(taskListIndex < 0 ){
          console.warn("Task List not found");
        }
        
        const idOfTaskToUpdate = this.findATaskIndex(taskListIndex, taskId);

        if(idOfTaskToUpdate < 0){
          console.warn("Task not found");
        }

        this.tasks[taskListIndex].tasks[idOfTaskToUpdate].isDone = !this.tasks[taskListIndex].tasks[idOfTaskToUpdate].isDone;
        this.updateTasksBehaviorSubject();

    }

    private findATaskListIndex(taskListId: string):number{
      return this.tasks.findIndex((taskLists) => {
        return taskLists.id === taskListId;
      })
    }

    private findATaskIndex(taskListIndex:number, taskId: string):number{
      return this.tasks[taskListIndex].tasks.findIndex((task) => {
        return task.id === taskId;
      })
    }

    private updateTasksBehaviorSubject():void{
      this.tasksBehaviorSubject.next(this.tasks);
      this.setTaskListInLocalStorage();
      console.log(this.tasks)
    }

    public deleteATask(taskListId:string, taskId: string):void{
      const taskListIndex = this.findATaskListIndex(taskListId);
      const taskListWithTaskDeleted = this.tasks[taskListIndex].tasks.filter((tasks:Task)=>{
        return tasks.id !== taskId
      })
      this.tasks[taskListIndex].tasks = taskListWithTaskDeleted;
      this.updateTasksBehaviorSubject();
    }

    public getTaskListFromLocalStorage():void{
      const localStorageString  = localStorage.getItem("Tasks");
      if(localStorageString){
        const localStorageObject = JSON.parse(localStorageString);
        if(Array.isArray(localStorageObject)){
          this.tasks = localStorageObject;
          this.updateTasksBehaviorSubject();
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

    private setTaskListInLocalStorage():void{
      try{
        localStorage.setItem("Tasks",JSON.stringify(this.tasks));
      }
      catch(error){
        console.error(error);
      }
    }
}
