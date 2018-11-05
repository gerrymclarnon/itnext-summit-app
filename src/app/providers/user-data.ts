import { Injectable } from '@angular/core';
import { Session } from './conference.model';
import { get, set } from 'idb-keyval';

export interface FavoriteSession {
  description: string;
  id: string;
  location: string;
  name: string;
  speakerNames: string[];
  timeEnd: string;
  timeStart: string;
  tracks: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: FavoriteSession[] = [];
  _sessionIdsOfSentNotifications: string[] = [];

  constructor() {
    this.getDataFromStorage();
  }

  async getDataFromStorage() {
    this._favorites = await <Promise<FavoriteSession[]>>get('favorites') || [];
    this._sessionIdsOfSentNotifications = await <Promise<string[]>>get('sessionIdsOfSentNotifications') || [];
  }

  hasFavorite(session: Session): boolean {
    return (this._favorites.filter(favSession => favSession.id === session.id).length > 0);
  }

  addFavorite(session: Session): void {
    const { speakers, ...favSession } = session;
    this._favorites.push(favSession);
    set('favorites', this._favorites);
  }

  removeFavorite(session: Session): void {
    const { speakers, ...favSession } = session;
    const index = this._favorites.findIndex((fav: FavoriteSession) => fav.id === favSession.id);
    if (index > -1) {
      this._favorites.splice(index, 1);
      set('favorites', this._favorites);
    }
  }

  isNotificationNotSentForSession(session: FavoriteSession) {
    return !this._sessionIdsOfSentNotifications.includes(session.id);
  }
}
