import { Component, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import {GameService} from '../../providers/game-service';
import {Game} from '../../models/Game';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePage {
  conferenceDate$;
  games: Game[] = [];
  nextGame: Game = null;

  constructor(public confData: ConferenceData,
              public gameService: GameService
  ) {
    this.conferenceDate$ = this.confData.getDate();

    this.gameService.getList().subscribe((data: any) => {
      this.games = data;

      if (this.games) {
        this.nextGame = this.games[0];
      }
    });
  }
}
