import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {SongsService} from './songs.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';
import {constants} from '../_shared/utils/constants';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: Song[];
  search = new Subject<string>();
  page = constants.PARAMS.PAGE_NUMBER;
  pages: any[];

  constructor(private songsService: SongsService) {
    this.songsService.getSongsBySearch(this.search, this.page)
      .subscribe(songs => {
        this.songs = songs.content;
        this.pages = Array.from(new Array(songs.totalPages), (val, index) => index + 1);
      });
  }

  ngOnInit() {
    this.getSongs(this.page);
  }

  getSongs(page: string): void {
    this.songsService.getSongs(page)
      .subscribe(songs => {
        this.songs = songs.content;
        this.pages = Array.from(new Array(songs.totalPages), (val, index) => index + 1);
      });
  }

  delete(song: Song) {
    this.songsService.delete(song)
      .subscribe(() => this.getSongs(this.page));
  }

  /*add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.songsService.addSong({ name } as Song)
      .subscribe(song => {
        this.heroes.push(song);
      });
  }*/
}
