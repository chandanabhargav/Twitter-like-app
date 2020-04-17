import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  baseUri: string = 'http://localhost:4000'
  accessToken = sessionStorage.getItem('accessToken')
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', this.accessToken);

  constructor(private http: HttpClient,) { }

  follow(element, id) { 
      let followId = id //params.id
      let userId = sessionStorage.getItem('userId')
      let followerData = {
        "follower": userId,
        "userId": followId
      } 
      this.callAPI(followerData).subscribe(data => { 
        console.log('Follower created: ' + data)
        element.innerHTML = ''
        element.innerHTML = 'Following &nbsp;<i class="fa fa-check"></i>'
        element.disabled = true
      },
      error => {
        console.log('Error creating follower')
      })
  }

  callAPI(followerData) {
    return this.http.post(this.baseUri + '/follow', followerData, {headers: this.headers})
  }
}
