import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUri = 'http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) { }

  signup(user) { 
    console.log('Service data: ' + user)
    console.log('Sending request to ' + this.baseUri + '/createUser')
    return this.http.post(this.baseUri + '/createUser', user, {headers: this.headers})
  }
}