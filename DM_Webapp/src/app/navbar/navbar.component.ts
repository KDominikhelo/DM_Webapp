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


  isLoggedIn: boolean = LoginComponent.isLoggedIn;
  

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }


  onLogOut(): void {

    this.userService.logOutUser(LoginComponent.authToken!).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error + " A bejelentkezés sikertelen"),
      () => console.log('Logged in succesfuly!', LoginComponent.isLoggedIn = false)
    );
    this.router.navigate([''])
    }
    

}
