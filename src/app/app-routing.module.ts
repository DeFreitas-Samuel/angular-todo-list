import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreationComponent } from './components/tasks/task-creation/task-creation.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'create-task', component: TaskCreationComponent },
  { path: '', component: TaskListComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
