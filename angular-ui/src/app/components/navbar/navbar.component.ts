import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _flashMessage: FlashMessagesService,
    private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this._authService.logout();
    this._flashMessage.show('You are Logged out', { cssClass: 'alert-success', timeout: 2000 })
    this._router.navigate(['/login']);
    return false;
  }

}
