import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
