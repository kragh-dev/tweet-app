import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from '../service/tweet.service';
import { UserService } from '../service/user.service';
import { Tweet } from './tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input('tweet') tweet!: any
  @Output() tweetLiked: EventEmitter<string> =new EventEmitter<string>();
  @Output() replyPosted: EventEmitter<string> =new EventEmitter<string>();

  isReply:boolean = false

  replyForm: FormGroup = this.formBuilder.group({
    reply: ['', [Validators.required, Validators.maxLength(144)]],
    tag: ['', Validators.maxLength(50)],
    authorId: [this.getUser().id]
  })
  errorMessage: any

  constructor(private datePipe: DatePipe, private userService: UserService, private tweetService: TweetService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  getTime(date: string) {
    var now = new Date()
    var postDate = new Date(date)
    var delta = Math.abs(now.getTime() - postDate.getTime());
    var seconds = Math.floor( delta / 1000 )
    var minutes = Math.floor( seconds / 60 )
    var hours = Math.floor( minutes / 60 )
    var days = Math.floor( hours / 24 )
    var weeks = Math.floor( days / 7 )
    var month = Math.floor( days / 30 )
    var year = Math.floor( days / 365 )
    var time : string | null = ""
    if(seconds < 60)
      time = seconds.toString()+'s'
    else if(minutes < 60)
      time = minutes.toString()+'m'
    else if(hours < 24)
      time = hours.toString()+'h'
    else if(days < 7)
      time = days.toString()+'d'
    else if(days >= 7)
    {
      if(now.getFullYear() -postDate.getFullYear() == 0)
        time = this.datePipe.transform(postDate, "dd MMM")
      else
      time = this.datePipe.transform(postDate, "dd MMM yy")
    }
    return time
  }

  genTags(tweet: string) {
    let text = tweet
    let tag: string = ''
    tweet.replace(/(\r\n|\n|\r)/gm, " ").split(' ').forEach(element => {
      if(element[0] === '#')
      {
        tag+=element+','
      }
    });
    tag = tag.slice(0, -1)
    tag.split(',').forEach(hashtag => {
      text = text.replace(hashtag, '<span class="hashtag">'+hashtag+'</span>')
    })
    return text;
  }

  likeTweet()
  {
    this.tweetService.likeTweet(this.getUser().loginId, this.tweet.id).subscribe(
      (data: any) => {
        if(data['status'] == "Tweet liked successfully" || data['status'] == "Tweet unliked successfully")
        {
          this.tweetLiked.emit(this.tweet.id);
        }
      }
    )
  }

  onReply()
  {
    this.isReply = !this.isReply
  }

  onReplyType()
  {
    this.errorMessage = ''
    let reply: string = this.replyForm.get('reply')?.value
    let tag: string = ''
    reply.replace(/(\r\n|\n|\r)/gm, " ").split(' ').forEach(element => {
      if(element[0] === '#')
      {
        tag+=element+','
      }
    });
    tag = tag.slice(0, -1)
    if(tag.replace(',','').length > 50)
    {
      this.errorMessage = "Total tag length should not be more than 50 characters"
    }
    this.replyForm.patchValue({'tag': tag})
  }

  resetForm() {
    this.replyForm = this.formBuilder.group({
      reply: ['', [Validators.required, Validators.maxLength(144)]],
      tag: ['', Validators.maxLength(50)],
      authorId: [this.getUser().id]
    })
  }

  onSubmit()
  {
    if(this.replyForm.get('reply')?.value != '')
    {
      console.log(this.replyForm.value)
      this.tweetService.replyTweet(this.replyForm, this.getUser().loginId, this.tweet.id).subscribe(
        (data: any) => {
          if(data['status'] == "Reply Posted Successfully")
          {
            this.resetForm();
            this.isReply = false
            this.replyPosted.emit(this.getUser().id);
          }
        }
      )
    }
    else
    {
      this.errorMessage = "Reply cannot be empty..."
    }
  }

  onTweetClick()
  {
    this.router.navigateByUrl("tweet/"+this.tweet.id)
  }

}
