import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Player} from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public items: Observable<Player[]>;

  private PATH = 'players';
  private firestore: AngularFirestore;
  private players: AngularFirestoreCollection<Player>;
  private managers: AngularFirestoreCollection<Player>;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    // this.players = this.firestore.collection<Player>(this.PATH);
    this.players = this.firestore.collection('players', ref => ref.orderBy('email'));
    this.managers = this.firestore.collection('players', ref => ref.where('manager', '==', true).orderBy('email'));
  }

  getList(): Observable<Player[]> {
    return this.players.valueChanges();
  }

  getManagerList(): Observable<Player[]> {
    return this.managers.valueChanges();
  }

  getListItem(id: string): Observable<Player> {
    const itemDoc: AngularFirestoreDocument<Player> = this.firestore.doc<Player>(this.PATH + '/' + id);
    return itemDoc.valueChanges();
  }

  addListItem(player: Player): Promise<void> {
    return this.players.doc(player.title).set(Object.assign({}, player));
  }

  updateListItem(player: Player): Promise<void> {
    return this.players.doc(player.title).update(Object.assign({}, player));
  }

  removeListItem(player: Player): Promise<void> {
    return this.players.doc(player.title).delete();
  }
}
