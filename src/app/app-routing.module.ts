import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchedulePage} from './pages/schedule/schedule';

const routes: Routes = [
  {
    path: 'schedule',
    children: [
      {
        path: '',
        component: SchedulePage,
      },
      {
        path: 'session/:sessionId',
        loadChildren: './pages/session-detail/session-detail.module#SessionDetailModule'
      }
    ]
  },
  {
    path: 'speakers',
    children: [
      {
        path: '',
        loadChildren: './pages/speaker-list/speaker-list.module#SpeakerListModule'
      },
      {
        path: 'session/:sessionId',
        loadChildren: './pages/session-detail/session-detail.module#SessionDetailModule'
      },
      {
        path: 'speaker-details/:speakerId',
        loadChildren: './pages/speaker-detail/speaker-detail.module#SpeakerDetailModule'
      }
    ]
  },
  {
    path: 'map',
    children: [
      {
        path: '',
        loadChildren: './pages/map/map.module#MapModule'
      }
    ]
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        loadChildren: './pages/about/about.module#AboutModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/schedule',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'terms-of-service',
    loadChildren: './pages/terms-of-service/terms-of-service.module#TermsOfServicePageModule'
  },
  {
    path: 'privacy-policy',
    loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
