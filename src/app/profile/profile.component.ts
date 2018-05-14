import {User} from "../models/user";
import {Component} from "@angular/core";
import {ProfileService} from "./profile.service";
import {LoginService} from "../login/login.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private me: User;
  private admin: boolean;

  constructor(private profileService: ProfileService) {
    this.profileService.getMe().subscribe(res => {
      this.me = res;
      this.admin = LoginService._admin();
    });
  }
}
