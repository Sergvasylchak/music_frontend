import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Song} from '../models/song';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SongsService {
  private songsUrl = 'api/lbry/songs';
  private addSongUrl = 'api/lbry/songs';

  constructor(private http: HttpClient) {
  }

  getSongsBySearch(search: Observable<string>) {
    return search.debounceTime(750)
      .distinctUntilChanged()
      .switchMap(search => this.getSongsByName(search));
  }

  getSongs() {
    return this.http.get<Song[]>(this.songsUrl)
      .map((res: Song[]) => res);
  }

  getSongsByName(name: string) {
    return this.http.get<Song[]>(this.songsUrl, {
      params: {'name': name}
    })
      .map((res: Song[]) => res);
  }

  addSong(song: Song) {
    return this.http.post<Song>(this.addSongUrl, song)
      .map((res: Song) => res);
  }

  delete(song: Song) {
    return this.http.delete<any>(this.songsUrl + '/' + song.id)
      .map((res: any) => res);
  }
}
