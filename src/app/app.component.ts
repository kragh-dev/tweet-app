import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tweet-app';

  constructor(private userService: UserService) {}

  getUser()
  {
    return this.userService.loggedInUser
  }
}
