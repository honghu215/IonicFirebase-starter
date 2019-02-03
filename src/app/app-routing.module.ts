import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'todos', loadChildren: './todo/todo.module#TodoPageModule' },
  { path: 'todo-details/:id', loadChildren: './todo/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'todo-details', loadChildren: './todo/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'photograph', canActivate: [AuthGuard], loadChildren: './photograph/photograph.module#PhotographPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'record', canActivate: [AuthGuard], loadChildren: './record/record.module#RecordPageModule' },
  { path: 'record-detail', loadChildren: './record/record-detail/record-detail.module#RecordDetailPageModule' },
  { path: 'record-detail/:id', loadChildren: './record/record-detail/record-detail.module#RecordDetailPageModule' },
  { path: 'advisor', loadChildren: './advisor/advisor.module#AdvisorPageModule' },
  { path: 'education', loadChildren: './education/education.module#EducationPageModule' },
  { path: 'logout', redirectTo: '/home'},
  { path: 'chat-to-expert', loadChildren: './chat-to-expert/chat-to-expert.module#ChatToExpertPageModule' },
  { path: 'groups', loadChildren: './chat-to-expert/groups/groups.module#GroupsPageModule' },
  { path: 'group-start', loadChildren: './chat-to-expert/group-start/group-start.module#GroupStartPageModule' },
  { path: 'chat-room', loadChildren: './chat-to-expert/chat-room/chat-room.module#ChatRoomPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
