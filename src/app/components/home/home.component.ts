import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserhomeService } from 'src/app/services/userhome.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { TweetsService } from 'src/app/services/tweets.service';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class HomeComponent implements OnInit {

  homeForm: FormGroup;
  imageSrc: string; //
  tweet: string;
  closeResult: string;
  tweetImgSet = false; //
  info;
  msgTitle;
  msgBody;
  users;
  userId;
  intervalId; 
  friends;
  following;

  constructor(private apiService: UserhomeService, private followService: FollowService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private activatedRoute: ActivatedRoute, private tweetService: TweetsService, private followingService: FollowingService) { }

  ngOnInit() { 
    if(sessionStorage.getItem('email') && sessionStorage.getItem('password')) {

      this.userId = sessionStorage.getItem('userId');
      this.friends = [];
      this.homeForm = this.fb.group({
        userId: [''],
        tweet: ['', [Validators.required, Validators.minLength(10)]],
        img: ['']
      });
      this.getFollowing();
      this.getUserTweets();
    }
    else {
      this.router.navigateByUrl('login')
    }
  }

  getFollowing() {
    this.followingService.getUsersFollowing(this.userId).subscribe(data => {
      var j = 0;
      this.following = [];
      for(var i=0;i<Object.keys(data).length;i++) {
        //debugger;
        this.following[j++] = data[i]._id;
      }
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    });
  }

  clearBelow() {
    this.getAllUsers();
  }

  closeFriendsList() {
    this.friends = [];
  }

  follow(element, id) { 
    this.followService.follow(element, id)
  }

  getAllUsers() {

    this.apiService.getAllUsers().subscribe(users => {
      console.log(users);  
      var j=0;
      for(var i=0;i<Object.keys(users).length;i++) {
        //debugger;
        if(this.following.indexOf(users[i]._id) > -1) {
          users[i].following = 1;
        }
        else {
          users[i].following = 0;
        }
        this.friends[j++] = users[i];
      } 
      debugger
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    });
  }

  likeTweet(element, tweetId) {
      let data = {
        "_id": tweetId,
        "follower": this.userId
      }
      this.tweetService.likeTweet(data).subscribe(data => {
        console.log('Liked')
        //element.classList.add('blue-font')
        this.getUserTweets()
      }, err => {
        if(err.status == 401) {
          sessionStorage.clear();
          this.router.navigateByUrl('login');
        }
      })
  }

  unLikeTweet(element, tweetId) { 
    let data = {
      "_id": tweetId,
      "follower": this.userId
    }
    this.tweetService.unLikeTweet(data).subscribe(data => {
      console.log('Unliked')
      this.getUserTweets()
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    })
  }

  getUserTweets() {
    let userId = sessionStorage.getItem('userId')
    debugger
    this.apiService.getUserTweets(userId).subscribe(data => { 
      this.info = data
      //this.getUserTweets()
      //this.intervalId = setInterval(this.getUserTweets, 5000)
    }, err => {
      if(err.status == 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('login');
      }
    })
  }
  
  get f() {
    return this.homeForm.controls;
  }

  isAtTheRateKey(event) {
    if(event.keyCode == 64) { //@
      //this.getAllUsers()
    }
  }

  castDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a')
  }

  addImgClick() {
    document.getElementById('add-file').click()
  }

  onFileChange(e) { 
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.tweetImgSet = true
    this.homeForm.value.img = this.imageSrc
  }

  openLg(content) { 
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit() { 
    this.homeForm.value.userId = sessionStorage.getItem('userId')
    console.log(this.homeForm.value)
    //debugger
    this.apiService.createTweet(this.homeForm.value).subscribe(data => {
      //debugger
      if(!data['errors']) {
        console.log('Tweet created')
        //set the msgs in modal 
        this.msgTitle = 'Tweeted!'
        this.msgBody = 'You tweeted succesfully. Your tweet is going to appear under your tweets section';
      }
      else {
        this.msgTitle = 'Oops!'
        this.msgBody = 'You can\' tweet without adding a few words'
      }
      //show a modal msg
      document.getElementById('open-modal').click()
      this.clearTweetValues()
      //this.getUserTweets()
    },
    err => {
      console.log(err)
    })
  }

  clearTweetValues() {
    this.tweetImgSet = false
    this.imageSrc = ''
    this.tweet = ''
  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
  }
}