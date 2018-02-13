import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Song} from '../../models/song';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import {Page} from '../../models/page';

@Injectable()
export class SongService {
  private songsUrl = 'api/lbry/songs';
  private addSongUrl = 'api/lbry/songs';
  private audioUrl = 'api/lbry/songs';

  constructor(private http: HttpClient) {
  }

  getSongsBySearch(search: Observable<string>, page: string) {
    return search.debounceTime(750)
      .distinctUntilChanged()
      .switchMap(search => this.getSongsByName(search, page));
  }

  getSongs(page: string) {
    return this.http.get<Page<Song>>(this.songsUrl, {
      params: {'page': page}
    })
      .map((res: Page<Song>) => res);
  }

  getSongsByName(name: string, page: string) {
    let params = new HttpParams()
      .append('name', name)
      .append('page', page);
    return this.http.get<Page<Song>>(this.songsUrl, {params: params})
      .map((res: Page<Song>) => res);
  }

  getSongById(id: number) {
    return this.http.get<Song>(this.songsUrl + '/' + id)
      .map((res: Song) => res);
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
