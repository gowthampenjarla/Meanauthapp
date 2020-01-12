import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private _validateService: ValidateService, private _flashMessage: FlashMessagesService,
    private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  onRegister({ value }: { value }) {
    const user = value;

    // if (!this._validateService.validateRegister(user)) {
    //   this._flashMessage.show('Please Fill all the fields!', { cssClass: 'alert-danger', timeout: 2000 });
    //   return false;
    // } else {
    //   console.log(`${user.name} is registered`)
    // }

    if (!this._validateService.validateEmail(user.email)) {
      this._flashMessage.show('Please Enter valid email address', { cssClass: 'alert-danger', timeout: 2000 })
      return false;
    }

    this._authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessage.show('You are now registered. Please Login', { cssClass: 'alert-success', timeout: 2000 })
        this._router.navigate(['/login']);
      } else {
        this._flashMessage.show('Something went wrong. Please try again later', { cssClass: 'alert-danger', timeout: 2000 });
        this._router.navigate(['/register']);

      }
    })

  }


}
