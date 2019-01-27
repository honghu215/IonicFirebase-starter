import { NgForm } from '@angular/forms';
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
  authData: AuthData = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.authData);
    }
  }



}
