import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
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
