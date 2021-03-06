import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormData } from 'src/app/features/auth/models/FormData';
import { Router } from '@angular/router';
import { LoginResponseData } from 'src/app/features/auth/models/LoginResponseData';
import { apiAuthUrl } from '../../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  public register({username, password}: FormData): void{
    this.httpClient.post(`${apiAuthUrl}/register`, { username, password })
      .subscribe(() => this.router.navigate(['auth/login']));
  }

  public login({username, password}: FormData): void{
    this.httpClient.post<LoginResponseData>(`${apiAuthUrl}/login`, { username, password })
      .subscribe(
        (data) => {
          this.router.navigate(['/store']),
          localStorage.setItem('auth_token', data.jwt_token);
        },
      );
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['auth']);
  }
 
  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  public getToken() {
    return localStorage.auth_token;
  }
}
