import {Component, Input} from '@angular/core';

@Component({
  selector: 'lbry-search',
  template: '<label class="songs_search">' +
  '<input placeholder="Search {{model}}" class="form-control"/>' +
  '</label>',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() model: string;
}
