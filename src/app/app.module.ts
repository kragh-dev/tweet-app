import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './site/header/header.component';
import { FooterComponent } from './site/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TweetComponent } from './tweet/tweet.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './site/user/user.component';
import { TweetAddComponent } from './tweet-add/tweet-add.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TweetViewComponent } from './tweet-view/tweet-view.component';
import { ReplyComponent } from './reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TweetComponent,
    ProfileComponent,
    UserComponent,
    TweetAddComponent,
    LoginComponent,
    SignUpComponent,
    UserCardComponent,
    UserListComponent,
    ResetPasswordComponent,
    TweetViewComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AsyncPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
