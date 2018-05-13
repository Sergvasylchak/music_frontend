import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {constants} from "../_shared/utils/constants";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem(constants.HEADERS.AUTH_HEADER)) {
      return true;
    }

    return this.router.navigate['login'];
  }
}
