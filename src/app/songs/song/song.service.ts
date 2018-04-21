import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Song} from '../../models/song';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import {Performer} from '../../models/performer';

@Injectable()
export class SongService {
  private songsUrl = 'api/lbry/songs';

  constructor(private http: HttpClient) {
  }

  getSongById(id: number) {
    return this.http.get<Song>(this.songsUrl + '/' + id)
      .map((res: Song) => {
        SongService.setDisplay(res, res.performers);
        return res;
      })
      .map((res: Song) => res);
  }

  delete(song: Song) {
    return this.http.delete<any>(this.songsUrl + '/' + song.id)
      .map((res: any) => res);
  }

  private static setDisplay(song: Song, performers: Performer[] = Array.of()) {
    if (song.performers.length) {
      song.display = performers.reduce(c => c).name;
    } else {
      song.display = 'unknown'
    }
  }
}
