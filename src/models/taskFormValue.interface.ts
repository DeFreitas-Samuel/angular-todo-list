import { priority } from "./enums/priority.enum";

export interface taskFormValue {
  title: string | null ,
  dueDate: string | null ,
  priority: priority | null ,
  taskList: string | null 
}
