import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  baseUri: string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);

  constructor(private http: HttpClient) { }

  getOwnTweets(userId) { 
    return this.http.get(this.baseUri + '/getOwnTweets/' + userId, {headers: this.headers})
  }

  likeTweet(data) {
    return this.http.post(this.baseUri + '/likeTweet', data, {headers: this.headers})
  }

  unLikeTweet(data) {
    return this.http.post(this.baseUri + '/unLikeTweet', data, {headers: this.headers})
  }
}