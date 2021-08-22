import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }
  
  private checkToken$() {
    const login = this.authService.logIn;
    
    if(!login) this.router.navigate(['auth']);
    return of(
      login,
    );
  }

  public canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkToken$();
  }
  
}
