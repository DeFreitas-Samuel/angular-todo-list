import { priority } from "./enums/priority.enum";

export interface taskFormValue {
  title: string | null |undefined,
  dueDate: string | null |undefined,
  priority: priority | null |undefined,
  taskList: string | null |undefined
}
