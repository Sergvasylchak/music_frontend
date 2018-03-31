import {Performer} from './performer';

export class Song {
  id: number;
  name: string;
  url: string;
  performers: Performer[];
  display: string;
}
