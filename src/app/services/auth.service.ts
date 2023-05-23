import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ResponseHelper } from '../core/model/template';
import { AuthResponse, UserData } from '../core/model/auth';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.API_URL  ;
  TOKEN_KEY = 'token';
  user = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http:HttpClient,
    private router : Router) { 
    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if(token) {
      const userData = this.getDecodedValue(token);
      this.user.next(userData);
      return;
    }
    this.user.next(null);

  }

  register(email:string,password:string,name:string,role:string){
    return this.http.post<ResponseHelper<AuthResponse>>(this.url+'/auth/register',{email,password,name,role})
    .pipe(
      map((res) => {
        console.log(res);
        localStorage.setItem(this.TOKEN_KEY,res.data.token);
        const userData = this.getDecodedValue(res.data.token);
        this.user.next(userData);
        return res;
      }),
      catchError(err => this.handleError(err)))
  }

  login(email:string,password:string){
    return this.http.post<ResponseHelper<AuthResponse>>(this.url+'/auth/login',{email,password})
    .pipe(
      map((res) => {
        localStorage.setItem(this.TOKEN_KEY,res.data.token);
        const userData = this.getDecodedValue(res.data.token);
        this.user.next(userData);
        return res;
      }),
      catchError(err => this.handleError(err)))
  }

  handleError(err:HttpErrorResponse) {
    console.log(err);
    let message = 'Something went wrong';
    if(err.error && err.error.error) {
      message = err.error.error;
    }
    return throwError(() => message);
  }

  private getDecodedValue(token:string) {
    const decode = jwtDecode<UserData>(token);
    return decode;
  }

  //getting value reactively
  getUserInfo() {
    return this.user.asObservable();
  }

  //getting user value as object
  getUserValue() {
    return this.user.getValue();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user.next(null);
    this.router.navigate(['/']);
  }
}
