import { Component, OnInit } from '@angular/core';
import { FollowersService } from 'src/app/services/followers.service';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers;
  following = [];

  constructor(private apiService: FollowersService, private followingService: FollowingService,private followService: FollowService,private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      this.getUserFollowers()
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  getUserFollowers() {
    debugger
    let userId = sessionStorage.getItem('userId')
    this.apiService.getUserFollowers(userId).subscribe(data => {
      console.log('Got the followers')
      this.followers = data
      this.getUsersFollowing()
    }, 
    error => {
      console.log('Error getting followers : ' + error)
    })
  }

  getUsersFollowing() {
    let userId = sessionStorage.getItem('userId')
    this.followingService.getUsersFollowing(userId).subscribe(data => {
      for(let key in data) {
        this.following.push(data[key]['_id'])
      }
    }, 
    error => {
      console.log(error)
    })
  }

  follow(element, id) {
    //debugger
    this.followService.follow(element, id)
  }
}
