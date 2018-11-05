import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public router: Router
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session: any) {
    this.router.navigateByUrl(`app/tabs/(speakers:session/${session.id})`);
  }

  goToSpeakerDetail(speaker: any) {
    this.router.navigateByUrl(
      `app/tabs/(speakers:speaker-details/${speaker.id})`
    );
  }

  openSpeakerTwitter(speaker: any) {
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
          text: 'Share via ...'
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
