import { Component } from '@angular/core';
import {constants} from './_shared/utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = constants.STRINGS.TITLE;
}
