import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireMessaging, AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AboutModule } from './pages/about/about.module';
import { MapModule } from './pages/map/map.module';
import { ScheduleModule } from './pages/schedule/schedule.module';
import { SessionDetailModule } from './pages/session-detail/session-detail.module';
import { SpeakerDetailModule } from './pages/speaker-detail/speaker-detail.module';
import { SpeakerListModule } from './pages/speaker-list/speaker-list.module';

interface Token {
  date: number;
  token: string;
  userAgent: string;
}

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';


import {AngularFireAuthModule} from '@angular/fire/auth';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'terms-of-service',
  privacyPolicyUrl: 'privacy-policy',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('main-sw.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AboutModule,
    MapModule,
    ScheduleModule,
    SessionDetailModule,
    SpeakerDetailModule,
    SpeakerListModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  public tokensRef: AngularFireList<Token>;
  constructor(
    private afMessaging: AngularFireMessaging,
    private afDatabase: AngularFireDatabase) {
      this.tokensRef = afDatabase.list('users');
      this.requestPushNotificationsPermission();
  }

  requestPushNotificationsPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          this.tokensRef.set(token, { date: new Date().getTime(), token: token } as Token);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
