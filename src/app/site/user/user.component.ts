import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  logoutUser()
  {
    return this.userService.onLogout()
  }

  onProfileClick()
  {
    this.router.navigateByUrl("profile/"+this.getUser().loginId)
  }

  changePassword()
  {
    this.router.navigateByUrl("resetPassword");
  }

}
