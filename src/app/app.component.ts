import {Component} from '@angular/core';
import {constants} from './_shared/utils/constants';
import {Router} from "@angular/router";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = constants.STRINGS.TITLE;

  constructor(private router: Router) {
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['/login'])
  }

  logged() {
    return LoginService._logged();
  }

  isAdmin() {
    return LoginService._admin();
  }
}
