import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  

  static authToken: string | undefined;
  static isLoggedIn: boolean = false;



  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username_email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    
}




onSubmit(): void {

  const logUser: User = {

    name: this.loginForm.value.username_email,
    pass: this.loginForm.value.password
  
  };

  this.userService.loginUser(logUser).subscribe(
    (response) => LoginComponent.authToken = response.token,
    (error: any) => console.log(error + " A bejelentkezés sikertelen"),
    () => console.log('Logged in succesfuly!', LoginComponent.isLoggedIn = true, this.router.navigate(['/home']))
  );
}



}





