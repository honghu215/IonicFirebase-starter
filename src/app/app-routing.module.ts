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
  {  path: 'user',
    loadChildren: './user/user.module#UserPageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {  path: 'education',
    loadChildren: './education/education.module#EducationPageModule'
  },
  {
    path: 'document',
    loadChildren: './document/document.module#DocumentPageModule'
  },
  {
    path: 'tracking',
    loadChildren: './tracking/tracking.module#TrackingPageModule'
  },
  {
    path: 'advisor',
    loadChildren: './advisor/advisor.module#AdvisorPageModule'
  },
  { path: 'todos', loadChildren: './todo/todo.module#TodoPageModule' },
  { path: 'todo-details/:id', loadChildren: './todo/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'todo-details', loadChildren: './todo/todo-details/todo-details.module#TodoDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
