import {Component, forwardRef, ViewChild} from '@angular/core';
import {Song} from '../models/song';
import {SongsService} from './songs.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {Subscription} from 'rxjs/Subscription';
import {constants} from '../_shared/utils/constants';
import {Page} from '../models/page';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ModalComponent} from "./dialog/modal.component";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent {
  @ViewChild(forwardRef(() => ModalComponent)) modal: ModalComponent;
  songs: Song[];
  search = new BehaviorSubject<string>(constants.PARAMS.BLANK);
  pages: any[];
  totalPages: number;
  currentPage = constants.PAGINATION.ONE;
  private request = new Subscription();

  constructor(private songsService: SongsService) {
    this.songsService.getSongsBySearch(this.search, constants.PARAMS.PAGE_NUMBER)
      .subscribe(songs => {
        this.songs = songs.content;
        this.currentPage = constants.PAGINATION.ONE;
        this.getPages(songs);
      });
  }

  getSongsByName(name: string, page: string) {
    this.request.unsubscribe();
    this.request = this.songsService.getSongsByName(name, page)
      .subscribe(songs => {
        this.songs = songs.content;
        this.currentPage = Number(page);
        this.getPages(songs);
      });
  }

  getPages(songs: Page<Song>) {
    if (songs.content.length === constants.PAGINATION.ZERO) {
      if (this.currentPage == constants.PAGINATION.ONE) {
        return this.pages = [];
      }
      this.currentPage = this.currentPage - 1;
      this.getSongsByName(this.search.getValue(), this.currentPage.toString());
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

  addToList(id: number) {
    alert(id.toString() + ' Added successfully');
  }
}
