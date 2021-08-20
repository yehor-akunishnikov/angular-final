import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormData } from 'src/app/features/auth/models/FormData';
import { Router } from '@angular/router';
import { LoginResponseData } from 'src/app/features/auth/models/LoginResponseData';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiAuthUrl = 'http://localhost:8080/api/auth';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  public register$({username, password}: FormData): void{
    const response = this.httpClient.post(
      `${this.apiAuthUrl}/register`,
      { username, password },
    );

    this.subscriptions.push(
      response.subscribe(
        () => {
            this.router.navigate(['/login']);
        },
      )
    );
  }

  public login$({username, password}: FormData): void{
    const response = this.httpClient.post<LoginResponseData>(
      `${this.apiAuthUrl}/login`,
      { username, password },
    );

    this.subscriptions.push(
      response.subscribe(
        (data) => {
          this.router.navigate(['/store']),
          localStorage.setItem('auth_token', data.jwt_token);
        },
      )
    );
  }

  public logout() {
    localStorage.removeItem('auth_token');
  }
 
  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  public unSub() {
    if(this.subscriptions.length) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }
}
