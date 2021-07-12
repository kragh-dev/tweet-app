import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './site/user/user.component';
import { TweetViewComponent } from './tweet-view/tweet-view.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'profile/:loginId', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  {path: 'tweet/:tweetId', component: TweetViewComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
