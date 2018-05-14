import {Component} from '@angular/core';
import {UsersService} from './users.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {User} from "../../models/user";
import {constants} from "../../_shared/utils/constants";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  private users: User[];

  constructor(private router: Router, private usersService: UsersService, private loginService: LoginService) {
    this.usersService.getUsers()
      .subscribe(res => this.users = res);
  }

  grantRights(user: User) {
    return this.usersService.grantRights(user)
      .subscribe(res => {
        this.getUsers();
        if (localStorage.getItem(constants.HEADERS.USERNAME) === user.username) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })
  }

  private getUsers() {
    this.usersService.getUsers()
      .subscribe(res => this.users = res);
  }
}
