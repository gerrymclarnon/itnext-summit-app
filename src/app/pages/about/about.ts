import { Component, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutPage {
  conferenceDate$;

  constructor(public confData: ConferenceData) {
    this.conferenceDate$ = this.confData.getDate();
  }
}
