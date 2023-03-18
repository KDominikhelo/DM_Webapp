import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private isLoggedIn = false;
  public loginChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }


    createUser(user: User): Observable<User> {
      return this.http.post<User>(`http://localhost:3000/regist`, user)
    }

    loginUser(user: User): Observable<User> {
      this.isLoggedIn = true;
      this.loginChangeEvent.emit(this.isLoggedIn)
      return this.http.post<User>(`http://localhost:3000/login`, user)
    }

    logOutUser(token: string): Observable<string>{
      this.isLoggedIn = true;
      this.loginChangeEvent.emit(this.isLoggedIn)
      return this.http.post<string>(`http://localhost:3000/logout/${token}`,token)
    }

    getIsloggedIn(){
      return this.isLoggedIn;
    }

}
