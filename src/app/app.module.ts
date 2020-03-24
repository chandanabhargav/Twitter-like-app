import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './components/logout/logout.component';
import { FollowingComponent } from './components/following/following.component';
import { LeftNavBarComponent } from './components/left-nav-bar/left-nav-bar.component';
import { FollowSuggestionsComponent } from './components/follow-suggestions/follow-suggestions.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FollowersComponent } from './components/followers/followers.component';
import { OwnTweetsComponent } from './components/own-tweets/own-tweets.component';
import { UnfollowComponent } from './components/unfollow/unfollow.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    HomeComponent,
    LogoutComponent,
    FollowingComponent,
    LeftNavBarComponent,
    FollowSuggestionsComponent,
    TopNavBarComponent,
    FollowersComponent,
    OwnTweetsComponent,
    UnfollowComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //for modal 
    NgbModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {}
