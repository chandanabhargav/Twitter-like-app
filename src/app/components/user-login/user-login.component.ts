import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup
  submitted = false
  status: string = ''

  constructor(private fb: FormBuilder, private apiService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    //console.log(this.loginForm.value)
    this.submitted = true
    if(this.loginForm.valid) {
      let user = this.loginForm.value
      this.apiService.getUser(user).subscribe((data) => { 
        if(data) {
          console.log('Logged In')
          this.storeSessionData(data)
          this.router.navigateByUrl('home')
        }
        else {
          console.log('Error logging in')
          this.status = 'Email and password do not match'
          return;
        }
      },
      (error) => {
        console.log('Error logging in')
        this.status = 'Email and password do not match'
        return;
      })
    }
    else {
      return;
    }
  }

  storeSessionData(data) {
    let user = data['user'];
    let accessToken = data['jwtoken'];
    sessionStorage.setItem('username', user.username)
    sessionStorage.setItem('email', user.email)
    sessionStorage.setItem('password', user.password)
    sessionStorage.setItem('userId', user._id)
    sessionStorage.setItem('accessToken', accessToken)
  }
}
