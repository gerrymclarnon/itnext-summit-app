import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mentionSpeakerTwitter } from '../../utils/social-engagement';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session$: Observable<any>;
  mentionSpeakerTwitter = mentionSpeakerTwitter;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.session$ = this.dataProvider.getSessionById(sessionId);
  }
}
