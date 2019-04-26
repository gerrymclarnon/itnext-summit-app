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

interface Token {
  date: number;
  token: string;
  userAgent: string;
}

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
