import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn$: boolean;
  constructor(
    public authService: AuthService,
    public router: Router
  ){ 
    this.authService.isLoggedIn.subscribe((_user) =>
    {
      this.isLoggedIn$ = _user
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  /*
    if (this.authService.LoggedIn !== true) {
      console.log("Logged In value auth guard", this.authService.LoggedIn)
      this.router.navigate(['login'])
      return false;
    }*/
          if (this.isLoggedIn$!==true)
          {
            console.log("Logged In value auth guard", this.authService.LoggedIns)
            this.router.navigate(['login'])
          } 

      return true;      
  }
}
