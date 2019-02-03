import { FormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from './../services/auth-data.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  authData: AuthData = {
    username: '',
    email: '',
    password: ''
  };

  singupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.authService.registerUser({
      username: this.singupForm.value.username,
      email: this.singupForm.value.email,
      password: this.singupForm.value.password
    });
  }

}
