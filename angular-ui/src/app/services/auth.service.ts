import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

interface UserPostResponse {
  success?: boolean;
  msg?: string;
  token?: string;
  user?: object;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user): Observable<UserPostResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    return this.http
      .post<UserPostResponse>(
        "http://localhost:3000/users/register",
        user,
        options
      )
      .pipe(map(res => res));
  }

  loginUser(user): Observable<UserPostResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    return this.http
      .post<UserPostResponse>(
        "http://localhost:3000/users/authenticate",
        user,
        options
      )
      .pipe(map(res => res));
  }

  getProfile(): Observable<UserPostResponse> {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    let options = { headers: headers };
    return this.http
      .get<UserPostResponse>("http://localhost:3000/users/profile", options)
      .pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem(user, JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("id_token");
    return !helper.isTokenExpired(token);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
