import { priority } from "./enums/priority.enum";

export type taskFormValue = {
  title: string | null ,
  dueDate: string | null ,
  priority: priority | null ,
  taskList: string | null 
}
