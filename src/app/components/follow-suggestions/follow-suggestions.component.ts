import { Component, OnInit } from '@angular/core';
import { UserhomeService } from 'src/app/services/userhome.service';
import { FollowService } from 'src/app/services/follow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-suggestions',
  templateUrl: './follow-suggestions.component.html',
  styleUrls: ['./follow-suggestions.component.css']
})
export class FollowSuggestionsComponent implements OnInit {

  nonFollowing;
  
  constructor(private router: Router, private apiService: UserhomeService, private followService: FollowService) { }

  ngOnInit() {
    this.getNonFollowing()
  }

  getNonFollowing() { 
    let userId = sessionStorage.getItem('userId')
    this.apiService.getNonFollowing(userId).subscribe(data => {
      this.nonFollowing = data
    },
    error => {
      console.log('Error getting other users')
    })
  }

  follow(element, id) { 
    this.followService.follow(element, id)
  }
}
