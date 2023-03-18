import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn!: boolean;

  constructor(private userService: UserService, private router: Router) {}



  canActivate() {

    this.userService.loginChangeEvent.subscribe(res =>{
        this.isLoggedIn = res;
      })


    if (this.isLoggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}