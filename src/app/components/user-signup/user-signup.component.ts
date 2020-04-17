import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signupForm: FormGroup
  submitted = false
  status = ''

  constructor(private fb: FormBuilder, private apiService: SignupService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['']
    })
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    //debugger
    this.submitted = true
    //console.log(this.signupForm.value)
    if(this.signupForm.valid) {
      let user = this.signupForm.value
      this.apiService.signup(user).subscribe((data) => {
        console.log('Success: ' + data);
        this.status = 'Your Account has been created';
      },
      (error) => {
        console.log(error);
        if(error.error == "user exists") {
          this.status = 'Account linked to this email already exists';
        }
        else {
          this.status = 'There was a problem creating your account';
        }
      })
    }
    else {
      return;
    }
  }
}