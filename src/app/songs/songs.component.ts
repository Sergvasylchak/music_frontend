import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {SongsService} from './songs.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: Song[];
  search = new Subject<string>();

  constructor(private songsService: SongsService) {
    this.songsService.getSongsBySearch(this.search)
      .subscribe(songs => this.songs = songs);
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songsService.getSongs()
      .subscribe(songs => this.songs = songs);
  }

  delete(song: Song) {
    this.songsService.delete(song)
      .subscribe(() => this.getSongs());
  }

  /*add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.songsService.addHero({ name } as Song)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }*/
}
