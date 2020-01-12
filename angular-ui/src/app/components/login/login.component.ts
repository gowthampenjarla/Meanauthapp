import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _flashMessage: FlashMessagesService,
    private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onLogin({ value }: { value }) {
    const user = value;

    this._authService.loginUser(user).subscribe(data => {
      if (data.success) {
        this._authService.storeUserData(data.token, data.user);
        this._flashMessage.show('You are now logged in.', { cssClass: 'alert-success', timeout: 2000 })
        this._router.navigate(['/dashboard']);
      } else {
        this._flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 })
        this._router.navigate(['/login']);
      }
    });
  }
}
