import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Class to register user informations and send to backend
 */
export class RegisterService {
  serverUri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  /**
 * Constructor to initialize parameters
 * @param uname username of user
 * @param pass password of user
 * @param phone phone number of user
 * @param gender gender of user
 */
  addUser(uname, pass, phone, gender){
    //if (pass.equals(confirmPass)) {
      // correct
    console.log('Correctly entered');
    const user = {
      uname: uname,
      pass: pass,
      phone: phone,
      gender: gender
    };
    console.log(user);
    return this.http.post(`${this.serverUri}/user/add`, user);
    //}
  }
}
