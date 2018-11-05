import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Events, MenuController, Platform, ToastController } from '@ionic/angular';
import { buyTicket } from './utils/ticket-sale';
import { SwUpdate } from '@angular/service-worker';
import { FavoriteSession, UserData } from './providers/user-data';
import { ConferenceData } from './providers/conference-data';
import { ToastOptions } from '@ionic/core';
import { get, set } from 'idb-keyval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  buyTicket = buyTicket;
  intervalRef;

  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/(schedule:schedule)',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/(speakers:speakers)',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/(map:map)',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/(about:about)',
      icon: 'information-circle',
    },
  ];

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private swUpdate: SwUpdate,
    private userData: UserData,
    private conferenceData: ConferenceData,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertController.create({
          header: 'App update!',
          message: 'Newer version of the app is available. It\'s a quick refresh away!',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              },
            }, {
              text: 'Refresh',
              handler: () => {
                window.location.reload();
              },
            },
          ],
        });

        await alert.present();
      });
    }

    if (!('Notification' in window)) {
      this.intervalRef = setInterval(() => {
        this.userData._favorites
          .filter((session: FavoriteSession) => this.conferenceData.isSessionAboutToStart(session))
          .filter((session: FavoriteSession) => this.userData.isNotificationNotSentForSession(session))
          .forEach((session: FavoriteSession) => {
            this.userData._sessionIdsOfSentNotifications.push(session.id);
            set('sessionIdsOfSentNotifications', this.userData._sessionIdsOfSentNotifications);
            this.presentToast(session);
          });
      }, 1000 * 10);
    }

    this.attachOnlineStatusEvents();
    this.showIosInstallBanner();
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }

  async presentToast(session: FavoriteSession) {
    const toast = await this.toastController.create({
      message: `Your favorite talk "${session.name}" will start at ${session.location} soon.`,
      duration: 5000,
      cssClass: 'custom-toast',
    });
    toast.present();
  }

  selectTab(index: number, fallbackUrl: string) {
    const tabs = document.querySelector('ion-tabs');
    let promise: Promise<any> = null;
    if (tabs) {
      promise = tabs.componentOnReady();
      promise.then(() => {
        return tabs.select(index);
      });
    } else {
      promise = this.navigate(fallbackUrl);
    }
    return promise.then(() => {
      return this.menu.toggle();
    });
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  async attachOnlineStatusEvents() {
    const toastOptions: ToastOptions = {
      message: `Your device is offline. Enjoy offline mode!`,
      duration: 3000,
      cssClass: 'custom-toast',
      position: 'top',
    };

    window.addEventListener('offline', async () => {
      const toast = await this.toastController.create({
        ...toastOptions,
        message: `Your device is offline. Enjoy offline mode!`,
      });
      toast.present();
    });

    window.addEventListener('online', async () => {
      const toast = await this.toastController.create({
        ...toastOptions,
        message: `Application is online.`,
      });
      toast.present();
    });
  }

  async showIosInstallBanner() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

    // Show the banner once
    const iosBannerIsShown = await get('iosBannerIsShown');

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode() && iosBannerIsShown === undefined) {
      const toast = await this.toastController.create({
        showCloseButton: true,
        closeButtonText: 'OK',
        cssClass: 'custom-toast',
        position: 'bottom',
        message: `To install the app, tap "Share" icon below and select "Add to Home Screen".`,
      });
      toast.present();
      set('iosBannerIsShown', true);
    }
  }
}
