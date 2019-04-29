import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { SchedulePage } from './schedule';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MomentModule
  ],
  exports: [RouterModule, MomentModule]
})
export class SchedulePageRoutingModule { }
