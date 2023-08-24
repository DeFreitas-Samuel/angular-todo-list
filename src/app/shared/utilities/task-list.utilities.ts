import { TaskList } from "src/models/taskList";
import { Task } from "src/models/task";

export class TaskListUtilities {
    public static getTotalTasks(taskList: TaskList):number{
        return taskList.tasks.length;
    }

    public static getTotalUnfinishedTasks(taskList: TaskList):number{
        const unfinishedTasks: Task[] = taskList.tasks.filter(task => {
            return task.isDone;
        })

        return unfinishedTasks.length;
    }
}