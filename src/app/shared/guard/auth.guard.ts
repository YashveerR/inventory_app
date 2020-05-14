import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../shared/services/auth.service";
import { map, first, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      /*
    if (this.authService.LoggedIns !== true) {
      console.log("Logged In value auth guard", this.authService.LoggedIns)
      this.router.navigate(['login'])

      return false;
    } */
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          console.log("This is retrieving firebase stuff", user)
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
