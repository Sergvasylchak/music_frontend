import {Component, Input} from "@angular/core";
import {ListsService} from "../../lists/lists.service";
import {SavedList} from "../../models/saved.list";
import {Song} from "../../models/song";
import {ListService} from "../../lists/list/list.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  private lists: SavedList[];
  @Input() private selected: SavedList;
  @Input() private newName: string;

  constructor(private listsService: ListsService, private listService: ListService) {
    this.init();
  }

  init() {
    this.listsService.getSavedLists()
      .subscribe(r => {
        this.lists = r;
      })
  }

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  public save(song: Song) {
    if (this.selected) {
      this.selected.songs.push(song);
      this.listService.updateList(this.selected)
        .subscribe(() => this.hide());
    }
    if (this.newName) {
      this.selected = new SavedList(this.newName, song);
      this.listService.createList(this.selected)
        .subscribe(r => r);
    }
    this.hide();
  }
}
