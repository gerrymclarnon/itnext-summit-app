import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  conferenceDate$;

  constructor(public confData: ConferenceData) {
    this.conferenceDate$ = this.confData.getDate();
  }
}
