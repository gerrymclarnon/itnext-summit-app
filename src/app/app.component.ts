import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/(schedule:schedule)',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/(speakers:speakers)',
      icon: 'contacts'
    },
    {
      title: 'Map',
      url: '/app/tabs/(map:map)',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/(about:about)',
      icon: 'information-circle'
    }
  ];

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
  ) {
  }

  ngOnInit() {
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
}
