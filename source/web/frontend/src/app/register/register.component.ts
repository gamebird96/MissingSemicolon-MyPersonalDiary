import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';

/**
 * Interface to manage gender of user
 */
export interface Gender {
  value: string;
  viewValue: string;
}
/**
 * Component handling registration of user
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * Class to register new user
 */
export class RegisterComponent implements OnInit {
  registrationForm;
  isSumbitted: boolean;
  gen: string;
  credentials: TokenPayload = {
    uname: '',
    pass: '',
    phone: '',
    gender: ''
  };
  genders: Gender[] = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
    {value: 'other', viewValue: 'Other'}
  ];

  /**
 * Constructor to  initialize variables
 * @param formBuilder the form obejct used while logging in to create complex strucutre
 * @param registerService indicates registration
 * @param router this helps in routing through different components
 * @param auth object used for authenticating user 
 */
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private auth: AuthenticationService) {
      this.registrationForm = this.formBuilder.group({
        userId: '',
        password: '',
        confpassword: '',
        phonenum: '',
      });
  }
/**
 * @ignore
 */
  ngOnInit() {
    this.isSumbitted = false;
  }
/**
 * Function checks integrity of submission
 * @param event event listener variable
 */
  onSelect(event){
    if (this.isSumbitted === false) {
      this.gen = event;
    }
  }
/**
 * Function to register data
 * @param registerData Contains registration data by user
 */
  onSubmit(registerData) {
    // Process checkout data here

    this.isSumbitted = true;
    if (registerData.password === registerData.confpassword) {
      console.log('Your order has been submitted', registerData);
      console.log('Gender:', this.gen);
      this.credentials = {
        uname: registerData.userId,
        pass: registerData.password,
        phone: registerData.phonenum,
        gender: this.gen
      };
      //this.registerService.addUser(registerData.userId, registerData.password, registerData.phonenum, this.gen).subscribe(() => {
        //this.router.navigate(['/login']);

      //});
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.error(err);
      });
    } else {
      alert('Inconsistent passwords !!');
    }
  }
}
