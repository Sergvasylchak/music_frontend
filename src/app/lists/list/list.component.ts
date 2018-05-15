import {Component, OnInit} from "@angular/core";
import {SavedList} from "../../models/saved.list";
import {ListService} from "./list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private list: SavedList;
  id: number;
  private sub: any;

  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getList(this.id);
  }

  getList(id: number) {
    this.listService.getSavedList(id)
      .subscribe(res => this.list = res);
  }

  removeFromList(id: number) {
    this.list.songs = this.list.songs.filter(c => c.id !== id);
    this.listService.updateList(this.list)
      .subscribe(c => c);
  }
}
