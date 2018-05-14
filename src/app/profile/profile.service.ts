import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable()
export class ProfileService {
  private meUrl = 'api/lbry/users/me';
  isAdmin: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  getMe() {
    return this.httpClient.get<User>(this.meUrl)
      .map((res: User) => {
        this.isAdmin = (res.role === 'ADMIN');
        return res;
      });
  }
}
