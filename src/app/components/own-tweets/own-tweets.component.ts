import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UserhomeService } from 'src/app/services/userhome.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-own-tweets',
  templateUrl: './own-tweets.component.html',
  styleUrls: ['./own-tweets.component.css']
})
export class OwnTweetsComponent implements OnInit {

  userId;
  tweets;

  constructor(private apiService: TweetsService, private router: Router) { }

  ngOnInit() { 
    if(sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      this.userId = sessionStorage.getItem('userId')
      this.getTweets()
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  getTweets() { 
    this.apiService.getOwnTweets(this.userId).subscribe(data => {
      this.tweets = data
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    })
  }

  castDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a')
  }
}