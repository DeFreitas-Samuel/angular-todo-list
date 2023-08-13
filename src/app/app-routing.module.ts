import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskCreationComponent} from './components/tasks/task-creation/task-creation.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TaskDetailComponent} from './components/task-list/task-detail/task-detail.component';
import {SingleTaskListComponent} from "./components/single-task-list/single-task-list.component";

const routes: Routes = [
  {path: 'create-task', component: TaskCreationComponent},
  {path: 'task-detail/:id', component: TaskDetailComponent},
  {path: 'task-list/:id', component: SingleTaskListComponent},
  {path: '', component: TaskListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
