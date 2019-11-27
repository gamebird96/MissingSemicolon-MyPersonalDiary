import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';
/**
 * Component handling login process
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Class to implement login functionality
 */
export class LoginComponent implements OnInit {
  rememberMe = false;  // State of remember me checkBox
  credentials: TokenPayload = {
    uname: '',
    pass: ''
  };
  isSubmitted: boolean;
  loginForm;
  /**
   * Constructor to initialize parameters
   * @param formBuilder the form obejct used while logging in to create complex strucutre
   * @param authService object used for authenticating user 
   * @param router this helps in routing through different components
   */
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    });
  }
  /**
   * @ignore
   */
  ngOnInit() {
  }
/**
 * Check if user had enabled remember me previously
 * @param event Passes the event when checkbox is clicked
 */
  checkCheckBoxvalue(event){
    if (this.isSubmitted === false) {
      this.rememberMe = !this.rememberMe;
    }

  }
/**
 * This function checks validity of user login data
 * @param loginData contains the user login data
 */
  onSubmit(loginData) {
    // Process checkout data here
    this.credentials = {
      uname: loginData.login,
      pass: loginData.password
    };
    this.isSubmitted = true;
    console.log('Your order has been submitted', loginData);
    console.log(this.rememberMe);
    this.authService.login(this.credentials).subscribe(() => {
      this.router.navigate(['/profile']);
    }, (err) => {
      console.error(err);
    });
    //this.authService.logout();
  }


}
