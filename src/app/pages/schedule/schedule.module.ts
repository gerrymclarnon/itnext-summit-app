import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {FirebaseUIModule} from 'firebaseui-angular';

import { SchedulePage } from './schedule';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SessionProgressPipe } from '../../providers/session-progress.pipe';
import { LetDirective } from '../../providers/let.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    FirebaseUIModule
  ],
  declarations: [
    SchedulePage,
    ScheduleFilterPage,
    SessionProgressPipe,
    LetDirective,
  ],
  entryComponents: [
    ScheduleFilterPage
  ]
})
export class ScheduleModule { }
