import { FormsModule, NgForm} from '@angular/forms';
import { AuthData } from './../services/auth-data.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  authData: AuthData = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.registerUser(this.authData);
    }
  }

}
