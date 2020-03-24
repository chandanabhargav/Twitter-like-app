import { Routes, Router, RouterModule } from '@angular/router'
import { UserSignupComponent } from './components/user-signup/user-signup.component'
import { NgModule } from '@angular/core'
import { UserLoginComponent } from './components/user-login/user-login.component'
import { HomeComponent } from './components/home/home.component'
import { LogoutComponent } from './components/logout/logout.component'
import { FollowingComponent } from './components/following/following.component'
import { FollowersComponent } from './components/followers/followers.component'
import { OwnTweetsComponent } from './components/own-tweets/own-tweets.component'
import { ProfileComponent } from './components/profile/profile.component'

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: UserLoginComponent},
    {path: 'signup', component: UserSignupComponent},
    {path: 'home', component: HomeComponent},
    {path: 'following', component: FollowingComponent},
    {path: 'followers', component: FollowersComponent},
    {path: 'tweets', component: OwnTweetsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'logout', component: LogoutComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}