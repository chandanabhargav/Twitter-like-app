import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUri: string = 'http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  getUser(user) {
    return this.http.post(this.baseUri + '/login', user, {headers: this.headers})
  }
}
