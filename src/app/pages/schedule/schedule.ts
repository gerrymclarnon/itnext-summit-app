import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import {GameService} from '../../providers/game-service';
import {Game} from '../../models/Game';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
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
        this.nextGame = this.games[this.games.length - 1];
      }
    });
  }

  ngOnInit() {
  }
}
