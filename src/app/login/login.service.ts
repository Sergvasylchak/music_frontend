import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {constants} from "../_shared/utils/constants";
import {ProfileService} from "../profile/profile.service";

@Injectable()
export class LoginService {
  private authUrl = "auth/lbry/login";

  constructor(private http: HttpClient, private router: Router, private profileService: ProfileService) {
  }

  login(user: User) {
    return this.http.post<any>(this.authUrl, user, {observe: 'response'})
      .subscribe(res => {
        const token = res.headers.get(constants.HEADERS.AUTH_HEADER);
        localStorage.setItem(constants.HEADERS.AUTH_HEADER, token);
        this.profileService.getMe()
          .subscribe(res => {
            localStorage.setItem(constants.HEADERS.USERNAME, res.username);
            localStorage.setItem(constants.HEADERS.ROLE, res.role);
          });
        return this.router.navigate(['/songs'])
      });
  }

  static _logged(): boolean {
    return !!localStorage.getItem(constants.HEADERS.AUTH_HEADER);
  }

  static _admin(): boolean {
    return localStorage.getItem(constants.HEADERS.ROLE) === 'ADMIN';
  }
}
