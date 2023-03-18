import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

ngOnInit(): void {
  this.registrationForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  const newUser: User = {

    name: this.registrationForm.value.username,
    email: this.registrationForm.value.email,
    pass: this.registrationForm.value.password
  
  };
}



onSubmit(): void {

  const newUser: User = {

    name: this.registrationForm.value.username,
    email: this.registrationForm.value.email,
    pass: this.registrationForm.value.password
  
  };


this.userService.createUser(newUser).subscribe(
  (response) => console.log(response),
  (error: any) => console.log(error),
  () => console.log('Done creating user')

);

}

}
