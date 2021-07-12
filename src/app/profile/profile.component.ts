import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userService.getUserProfile(params.get('loginId'), this.getUser().id).subscribe(
        (data: any) => {
          this.profile = data
        }
      )
    })
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  refreshAfterAction(id: string)
  {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userService.getUserProfile(params.get('loginId'), this.getUser().id).subscribe(
        (data: any) => {
          this.profile = data
        }
      )
    })
  }

}
