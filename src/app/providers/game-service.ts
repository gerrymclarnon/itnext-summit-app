import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Game} from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public items: Observable<Game[]>;

  private PATH = 'games';
  private firestore: AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<Game>;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    this.itemsCollection = this.firestore.collection<Game>(this.PATH, ref => ref.orderBy('datetime'));
  }

  getList(): Observable<Game[]> {
    return this.itemsCollection.valueChanges();
  }

  getListItem(id: string): Observable<Game> {
    const itemDoc: AngularFirestoreDocument<Game> = this.firestore.doc<Game>(this.PATH + '/' + id);
    return itemDoc.valueChanges();
  }

  addListItem(game: Game): Promise<void> {
    return this.itemsCollection.doc(game.datetime.toISOString()).set(Object.assign({}, game));
  }

  updateListItem(game: Game): Promise<void> {
    return this.itemsCollection.doc(game.id).update(Object.assign({}, game));
  }

  removeListItem(game: Game): Promise<void> {
    return this.itemsCollection.doc(game.id).delete();
  }
}
