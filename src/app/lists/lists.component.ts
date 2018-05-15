import {Component} from '@angular/core';
import {SavedList} from "../models/saved.list";
import {ListsService} from "./lists.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
  private lists: SavedList[];

  constructor(private listService: ListsService) {
    this.init();
  }

  delete(list: SavedList) {
    this.listService.delete(list)
      .subscribe(() => this.init());
  }

  init() {
    this.listService.getSavedLists()
      .subscribe(res => this.lists = res);
  }

}
