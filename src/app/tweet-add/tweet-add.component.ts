import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TweetService } from '../service/tweet.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tweet-add',
  templateUrl: './tweet-add.component.html',
  styleUrls: ['./tweet-add.component.css']
})
export class TweetAddComponent implements OnInit {

  @Output() tweetPosted: EventEmitter<string> =new EventEmitter<string>();

  tweetForm: FormGroup = this.formBuilder.group({
    tweet: ['', [Validators.required, Validators.maxLength(144)]],
    tag: ['', Validators.maxLength(50)],
    authorId: [this.getUser().id]
  })
  errorMessage: any

  constructor(private formBuilder: FormBuilder, private userService: UserService, private tweetService: TweetService) { }

  ngOnInit(): void {
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  onTweetType()
  {
    this.errorMessage = ''
    let tweet: string = this.tweetForm.get('tweet')?.value
    let tag: string = ''
    tweet.replace(/(\r\n|\n|\r)/gm, " ").split(' ').forEach(element => {
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
    this.tweetForm.patchValue({'tag': tag})
  }

  resetForm() {
    this.tweetForm = this.formBuilder.group({
      tweet: ['', [Validators.required, Validators.maxLength(144)]],
      tag: ['', Validators.maxLength(50)],
      authorId: [this.getUser().id]
    })
  }

  onSubmit()
  {
    if(this.tweetForm.get('tweet')?.value != '')
    {
      this.tweetService.add(this.tweetForm, this.getUser().loginId).subscribe(
        (data: any) => {
          if(data['status'] == "Tweet Posted Successfully")
          {
            this.resetForm();
            this.tweetPosted.emit(this.getUser().id);
          }
        }
      )
    }
    else
    {
      this.errorMessage = "Tweet cannot be empty..."
    }
  }

}
