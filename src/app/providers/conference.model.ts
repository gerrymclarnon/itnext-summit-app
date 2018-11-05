export interface Conference {
  map: Map[];
  schedule: Schedule[];
  speakers: Speaker[];
  tracks: string[];
}

export interface Speaker {
  about: string;
  company: string;
  id: string;
  name: string;
  profilePic: string;
  sessions: Session[];
  twitter: string;
}

export interface Session {
  description: string;
  id: string;
  location: string;
  name: string;
  speakerNames: string[];
  speakers: Speaker[];
  timeEnd: string;
  timeStart: string;
  tracks: string[];
}

export interface Map {
  center: boolean;
  lat: number;
  lng: number;
  name: string;
}

export interface Schedule {
  date: string;
  groups: SessionGroup[];
}

export interface SessionGroup {
  time: string;
  sessions: Session[];
}
