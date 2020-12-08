import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AddStudentsComponent } from './students/add-students/add-students.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path:'addStudent',
    component:AddStudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
