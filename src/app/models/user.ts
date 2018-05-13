export class User {
  id: number;
  username: string;
  private password: string;
  firstName: string;
  lastName: string;
  locked: boolean;
  role: string;

  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }
}
