import {Song} from "./song";

export class SavedList {
  id: number;
  name: string;
  songs: Song[];

  constructor(name: string, song: Song) {
    this.name = name;
    this.songs = Array.of(song);
  }
}
