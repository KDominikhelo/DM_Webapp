import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';

const routes: Routes = [



  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
