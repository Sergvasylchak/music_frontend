import {Component, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'lbry-page',
  template: '<a href="javascript:void(0)" class="page-link">{{page}}</a>'
})
export class PaginationComponent {
  @Input() page: string;
  @Input() search: Subject<string>;
}
