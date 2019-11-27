import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  loginUser(uname, passwd) { // verifies user and logs in

  }
}
