import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserhomeService } from 'src/app/services/userhome.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { TweetsService } from 'src/app/services/tweets.service';

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

  constructor(private apiService: UserhomeService, private followService: FollowService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private activatedRoute: ActivatedRoute, private tweetService: TweetsService) { }

  ngOnInit() { 
    if(sessionStorage.getItem('email') && sessionStorage.getItem('password')) {

      this.userId = sessionStorage.getItem('userId')
      this.homeForm = this.fb.group({
        userId: [''],
        tweet: ['', [Validators.required, Validators.minLength(10)]],
        img: ['']
      })
      this.getUserTweets()
    }
    else {
      this.router.navigateByUrl('login')
    }
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
      }, 
      error => {
        console.log(error)
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
    }, 
    error => {
      console.log(error)
    })
  }

  getUserTweets() {
    let userId = sessionStorage.getItem('userId')
    //debugger
    this.apiService.getUserTweets(userId).subscribe(data => { 
      this.info = data
      //this.getUserTweets()
      //this.intervalId = setInterval(this.getUserTweets, 5000)
    },
    error => {
      console.log(error)
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
  
  getAllUsers() { 
    /* this.apiService.getUsers().subscribe(data => {
      console.log(users)
    },
    error => {
      console.log(error)
    }) */
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
    debugger
    this.apiService.createTweet(this.homeForm.value).subscribe(data => {
      //debugger
      if(!data['errors']) {
        console.log('Tweet created')
        //set the msgs in modal 
        this.msgTitle = 'Tweeted!'
        this.msgBody = 'You tweeted succesfully'
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