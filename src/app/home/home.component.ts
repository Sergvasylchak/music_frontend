import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';

import '../../styles.scss'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
}
