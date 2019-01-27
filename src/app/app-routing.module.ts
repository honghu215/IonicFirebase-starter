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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
