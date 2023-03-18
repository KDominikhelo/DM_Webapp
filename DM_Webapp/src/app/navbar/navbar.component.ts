import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn!: boolean;
  

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.getIsloggedIn();
    this.userService.loginChangeEvent.subscribe(res =>{
      this.isLoggedIn = res;
    })

  }


  onLogOut(): void {

    this.userService.loginChangeEvent.subscribe(res =>{
      this.isLoggedIn = res;
    })

    this.userService.logOutUser(LoginComponent.authToken!).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error + " A bejelentkezés sikertelen"),
      () => console.log('Logged in succesfuly!', this.isLoggedIn = false)
    );
    
    this.router.navigate([''])

  }


    

}

