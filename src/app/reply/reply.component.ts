import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input('reply') reply!: any

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
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

}
