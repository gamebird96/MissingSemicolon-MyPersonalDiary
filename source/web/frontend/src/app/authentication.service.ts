import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
/**
 * Interface carrying uer details
 */
export interface UserDetails {
  _id: string;
  uname: string;
  pass?: string;
  phone?: string;
  gender?: string;
  exp: number;
  iat: number;
}
/**
 * Interface for JSON Web Token Response from backend
 */
interface TokenResponse {
  token: string;
}
/**
 * Interface to pass user info
 */
export interface TokenPayload {
  uname: string;
  pass: string;
  phone?: string;
  gender?: string;
}
/**
 * Decorator that marks a class as available to be provided and injected as a dependency
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Service class that handles authentication of user, user registration and login
 */
export class AuthenticationService {
  private token: string;
  serverUri = 'http://localhost:3000';
  /**
   * Constructor to initialize variables
   * @param http http address
   * @param router Helps in moving from one webpage to another
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Used for saving JSON web token
   * @param token Saves JSON Web Token in local memory
   */
  private saveToken(token: string) {
    localStorage.setItem('mean-token', token);
    this.token = token;
    console.log('Token: ' + localStorage.getItem('mean-token'));
  }
/**
 * Retrieves token from local memory
 */
  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
/**
 * Fetches user details
 */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      console.log('Token details: ' + payload);
      payload = window.atob(payload);
      console.log('Token details: ' + payload);
      console.log('Token details: ' + payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
/**
 * Checks if user is logged in
 */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
/**
 * Used to send request to server
 * @param method post or get http method being used
 * @param type situation when it is used
 * @param user Token of user
 */
  private request(method: 'post'|'get', type: 'login'|'user/add'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.serverUri}/${type}`, user);
    } else {
      base = this.http.get(`${this.serverUri}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    console.log(base);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          console.log('Data.Token:' + data.token);
          this.saveToken(data.token);
          let a = this.getUserDetails();
        }
        return data;
      })
    );

    return request;
  }
/**
 * Used when new user registers
 * @param user Token of user
 */
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'user/add', user);
  }
/**
 * Used when user logs in
 * @param user Token of user
 */
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }
/**
 * Fetches user profile
 */
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
/**
 * logs out user
 */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
}
