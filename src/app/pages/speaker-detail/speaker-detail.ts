import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { Observable } from 'rxjs';
import { openSpeakerTwitter } from '../../utils/social-engagement';
import { Speaker } from '../../providers/conference.model';


@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage {
  speaker$: Observable<Speaker>;
  openSpeakerTwitter = openSpeakerTwitter;

  constructor(
    private dataProvider: ConferenceData,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const speakerId = this.route.snapshot.paramMap.get('speakerId');
    this.speaker$ = this.dataProvider.getSpeakerById(speakerId);
  }

  goToSessionDetail(session: any) {
    this.router.navigateByUrl(`app/tabs/(schedule:session/${session.id})`);
  }
}
