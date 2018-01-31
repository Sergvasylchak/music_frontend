import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {SongsService} from './songs.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {constants} from '../_shared/utils/constants';
import {Page} from '../models/page';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: Song[];
  search = new BehaviorSubject<string>(constants.PARAMS.BLANK);
  pages: any[];
  totalPages: number;
  currentPage = Number(constants.PARAMS.PAGE_NUMBER);

  constructor(private songsService: SongsService) {
    this.songsService.getSongsBySearch(this.search, constants.PARAMS.PAGE_NUMBER)
      .subscribe(songs => {
        this.songs = songs.content;
        this.getPages(songs);
      });
  }

  ngOnInit() {
    this.getSongs(constants.PARAMS.PAGE_NUMBER);
  }

  getSongs(page: string): void {
    this.songsService.getSongs(page)
      .subscribe(songs => {
        this.songs = songs.content;
        this.getPages(songs);
      });
  }

  delete(song: Song) {
    this.songsService.delete(song)
      .subscribe(() => this.getSongsByName(this.search.getValue(), this.currentPage.toString()));
  }

  getSongsByName(name: string, page: string) {
    this.songsService.getSongsByName(name, page)
      .subscribe(songs => {
        this.songs = songs.content;
        this.currentPage = Number(page);
        this.getPages(songs);
      });
  }

  getPages(songs: Page<Song>) {
    if (songs.content.length === 0) {
      if (this.currentPage == 1) {
        return this.pages = [];
      }
      this.currentPage = this.currentPage - 1;
      this.getSongs(this.currentPage.toString());
    }
    let array = Array.from(new Array(songs.totalPages), (val, index) => index + 1);
    this.totalPages = songs.totalPages;
    array = array.filter(c => {
      return (array.indexOf(this.currentPage) <= constants.PAGINATION.THREE
        && array.indexOf(c) <= constants.PAGINATION.SIX)
        || (array.indexOf(this.currentPage) >= array.indexOf(this.totalPages - constants.PAGINATION.THREE)
          && array.indexOf(c) >= array.indexOf(this.totalPages - constants.PAGINATION.SIX))
        || (array.indexOf(c) - array.indexOf(this.currentPage) < constants.PAGINATION.FOUR
          && array.indexOf(this.currentPage) - array.indexOf(c) < constants.PAGINATION.FOUR);
    });
    return this.pages = array;
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
