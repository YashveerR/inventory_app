import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
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
      console.log("Logged IN INNER PAge value", this.authService.LoggedIns)
      if (this.authService.LoggedIns== true){
        console.log("Logged In value auth inner guard", this.authService.LoggedIns)
        this.router.navigate(['home'])
        return false;
      }
      else
      {
        return true;
      }
     
      
  }
  
}
