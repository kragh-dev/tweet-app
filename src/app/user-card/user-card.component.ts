import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('user') user!: any

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  onUserClick()
  {
    this.router.navigateByUrl("profile/"+this.user.loginId)
  }
}
