import {Performer} from './performer';

export class Song {
  id: number;
  name: string;
  url: string;
  performers: Performer[];
  author = this.performers[0].name;

  getAuthor(): string {
    return this.performers[0].name;
  }
}
