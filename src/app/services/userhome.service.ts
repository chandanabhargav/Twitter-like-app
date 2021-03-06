import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserhomeService {

  baseUri:string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);

  constructor(private http: HttpClient) { }

  getUserTweets(userId) { 
    return this.http.get(this.baseUri + '/getUserTweets/' + userId, {headers: this.headers})
  }

  getNonFollowing(userId) {
    return this.http.get(this.baseUri  + '/getNonFollowing/' + userId, {headers: this.headers})
  }

  getFollowers(userId) {
    debugger
    return this.http.get(this.baseUri  + '/getFollowers/' + userId, {headers: this.headers})
  }

  createTweet(tweetData) {
    return this.http.post(this.baseUri + '/createTweet', tweetData, {headers: this.headers})
  }

  getAllUsers() {
    return this.http.get(this.baseUri + "/users", {headers: this.headers});
  }
}