import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import {User} from "../../models/user";
import {Page} from "../../models/page";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UsersService {
  private usersUrl = 'api/lbry/users';
  private grantRightsUrl = 'api/lbry/users/';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Page<User>>(this.usersUrl)
      .map((res: Page<User>) => {
        return res.content;
      })
  }

  grantRights(user: User) {
    return this.http.put(this.grantRightsUrl + user.id.toString(), user)
      .map(res => res);
  }
}
