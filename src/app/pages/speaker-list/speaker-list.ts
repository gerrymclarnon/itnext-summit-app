import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { Session, Speaker } from '../../providers/conference.model';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpeakerListPage {
  speakers: Speaker[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public router: Router
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: Speaker[]) => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session: Session) {
    this.router.navigateByUrl(`app/tabs/(speakers:session/${session.id})`);
  }

  goToSpeakerDetail(speaker: Speaker) {
    this.router.navigateByUrl(
      `app/tabs/(speakers:speaker-details/${speaker.id})`
    );
  }

  openSpeakerTwitter(speaker: Speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            navigator.clipboard.writeText(window.location.origin + `/app/tabs/(speakers:speaker-details/${speaker.id})`);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
