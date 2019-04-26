import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { AboutPage } from './about';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MomentModule
  ],
  exports: [RouterModule, MomentModule]
})
export class AboutPageRoutingModule { }
