import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: any
  users: any
  profile: any
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router: Router) { }

  authenticate(credentials:any)
  {
    let body = JSON.stringify(credentials.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    return this.http.post(this.baseUrl+"login",body,options)
  }

  register(user:any)
  {
    let body = JSON.stringify(user.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    return this.http.post(this.baseUrl+"register",body,options)
  }

  // checkUserName(userName:string)
  // {
  //   let body = userName
  //   let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
  //   let options = { headers: header }
  //   return this.http.get(this.baseUrl+"auth/checkUserName/"+body,options)
  // }
  onLogout()
  {
    this.loggedInUser = null
    this.router.navigateByUrl("/login")
  }

  getAllUsers()
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    this.users = this.http.get<any[]>(this.baseUrl+"users/all",options)
  }

  getUserProfile(loginId: any, user: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.get(this.baseUrl+loginId+"?user="+user,options)
  }

  getUserTweetCount(user: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.get(this.baseUrl+"count?user="+user,options)
  }

  checkEmailLoginId(type: string, data: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.get(this.baseUrl+"check/"+type+"/"+data,options)
  }

  resetPassword(loginId: any, newPassword: string)
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    let options = { headers: header };
    return this.http.put(this.baseUrl+"user/"+loginId+"/resetPassword/"+newPassword,options)
  }
}
