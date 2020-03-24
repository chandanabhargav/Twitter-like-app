import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  baseUri: string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);

  constructor(private http: HttpClient) { }

  getUserFollowers(userId) {
    debugger
    return this.http.get(this.baseUri + '/getUserFollowers/' + userId, {headers: this.headers})
  }
}
