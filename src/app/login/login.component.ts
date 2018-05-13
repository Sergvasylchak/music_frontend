import {Component, Input} from "@angular/core";
import {LoginService} from "./login.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input()
  private username: string;
  @Input()
  private password: string;

  constructor(private loginService: LoginService) {
  }

  login() {
    const user = new User(this.username, this.password);
    this.loginService.login(user);
  }

}
