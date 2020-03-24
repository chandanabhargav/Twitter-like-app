import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnfollowService {

  baseUri: string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);
  
  constructor(private http: HttpClient) { }

  unfollow(data) {
    return this.http.post(this.baseUri + '/unfollow', data, {headers: this.headers})
  }
}