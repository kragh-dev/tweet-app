import { Component, OnInit } from '@angular/core';
import { TweetService } from '../service/tweet.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: any

  constructor(private tweetService: TweetService, private userService: UserService) { }

  ngOnInit(): void {
    this.tweetService.getAllTweets(this.getUser().id).subscribe(
      (data: any) => {
        this.tweets = data
      }
    );
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  refreshAfterAction(id: string)
  {
    this.tweetService.getAllTweets(this.getUser().id).subscribe(
      (data: any) => {
        this.tweets = data
      }
    );
    this.userService.getUserTweetCount(this.getUser().id).subscribe(
      (data: any) => {
        this.userService.loggedInUser.tweetCount = data['count']
      }
    )
  }

}
