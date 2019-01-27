import { EducationPage } from './education.page';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: EducationPage },
    { path: 'one', loadChildren: './one/one.module#OnePageModule' },
    {
        path: 'two',
        loadChildren: './two/two.module#TwoPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducationRoutingModule { }
