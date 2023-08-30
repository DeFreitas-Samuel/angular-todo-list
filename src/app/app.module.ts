import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskCreationComponent} from './components/tasks/task-creation/task-creation.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TaskComponent} from './components/task-list/task/task.component';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';
import {environment} from 'src/environments/environment';
import {TaskDetailComponent} from './components/task-list/task-detail/task-detail.component';
import {AppState} from './shared/states/tasks.state';
import {SpecificTaskListComponent} from './components/task-list/specific-task-list/specific-task-list.component';
import {SingleTaskListComponent} from './components/single-task-list/single-task-list.component';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import { ProjectsListComponent } from './components/sidebar/projects-list/projects-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCreationComponent,
    TaskListComponent,
    NotFoundComponent,
    TaskComponent,
    TaskDetailComponent,
    SpecificTaskListComponent,
    SingleTaskListComponent,
    SidebarComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
