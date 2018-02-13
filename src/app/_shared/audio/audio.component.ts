import {Component, Input} from '@angular/core';

@Component({
  selector: 'lbry-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  @Input() url: string;
}

