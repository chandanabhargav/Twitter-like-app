import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  baseUri: string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);

  constructor(private http: HttpClient) { }

  getUsersFollowing(userId) {
    return this.http.get(this.baseUri + '/getUsersFollowing/' + userId, {headers: this.headers});
  }
}
