import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthData } from './../services/auth-data.model';
import { AuthService } from './../services/auth.service';
import { User } from './../services/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userId: string = null;
  loginForm: FormGroup;
  login_err_msg = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    // }).then(res => {
    //   if (res.status === 'success') {
    //     this.router.navigate(['/home']);
    //   } else {
    //     console.log(res.message.message);
    //     this.login_err_msg = res.message.message;
    //   }
    // });
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  googleLogin() {
    this.authService.googleLogin();
  }


}
