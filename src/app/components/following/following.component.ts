import { Component, OnInit } from '@angular/core';
import { FollowingService } from 'src/app/services/following.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UnfollowService } from 'src/app/services/unfollow.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following;
  deleteId;
  userId;
  constructor(private apiService: FollowingService, private modalService: NgbModal, private router: Router, private unfollowService: UnfollowService) { }

  ngOnInit() {
    if(sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      this.userId = sessionStorage.getItem('userId')
      this.getUsersFollowing()
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  getUsersFollowing() {
    this.apiService.getUsersFollowing(this.userId).subscribe(data => {
      //debugger
      console.log('Got all following')
      this.following = data
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    })
  }

  unfollow() {
    if(this.deleteId) {
      let data = {
        "userId": this.deleteId,
        "follower": this.userId
      }
      this.unfollowService.unfollow(data).subscribe(data => {
        console.log('Deleted: ' + this.deleteId)
        this.getUsersFollowing()
      }, err => {
        if(err.status == 401) {
          sessionStorage.clear();
          this.router.navigateByUrl('login');
        }
      })
    }
  }

  openUnfollowModal(content, id) { 
    this.deleteId = id
    this.modalService.open(content, {size: 'lg'})
  }
}
