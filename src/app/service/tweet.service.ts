import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  tweets: any
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  add(tweet:any, username: string)
  {
    let body = JSON.stringify(tweet.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    return this.http.post(this.baseUrl+username+"/add",body,options)
  }

  getAllTweets(user: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.get<any[]>(this.baseUrl+"all?user="+user,options)
  }

  likeTweet(username: string, id: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.put(this.baseUrl+username+"/like/"+id,options)
  }

  replyTweet(reply: any, username: string, id: string)
  {
    let body = JSON.stringify(reply.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    return this.http.post(this.baseUrl+username+"/reply/"+id,body,options)
  }

  getTweet(id: any, user: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.get(this.baseUrl+"tweet/"+id+"?user="+user,options)
  }
}
