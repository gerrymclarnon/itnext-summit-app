import {Player} from './Player';
import { firestore } from 'firebase';

export class Game {
  id: string;
  title: string;
  location: string;
  datetime: Date;
  sendInvites: boolean;
  players: Array<Player>;

  constructor(title: string, location: string, datetime: firestore.Timestamp, sendInvites: boolean, players: Array<Player>) {
    this.title = title;
    this.location = location;
    this.datetime = datetime.toDate();
    this.sendInvites = sendInvites;
    this.players = players;
  }
}
