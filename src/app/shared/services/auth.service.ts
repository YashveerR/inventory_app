
import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from "./user"
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class AuthService {
    userData: any;
    lin:boolean;

    private loggedIn = new BehaviorSubject<boolean>(false); 

    get isLoggedIn() {
          return this.loggedIn.asObservable(); // {2}
    }

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,  
        public ngZone: NgZone // NgZone service to remove outside scope warning
      )
      {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    
        this.afAuth.authState.subscribe(user => {
            if (user) {
              console.log("DO WE EVEN GET HERE!!!!!!!");
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              JSON.parse(localStorage.getItem('user'));
            } else {
              localStorage.setItem('user', null);
              JSON.parse(localStorage.getItem('user'));
            }
          }) 
      }
      // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(['login']);
      }).catch((error) => {
        window.alert(error)
      })
    }
    // Sign up with email/password
    SignUp(email, password) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          //Call the SendVerificaitonMail() function when new user sign 
          //up and returns promise 
          this.SendVerificationMail();
          this.SetUserData(result.user);
          this.router.navigate(['login']);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

      // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
    }
          // Sign in with email/password
    SignIn(email, password) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.loggedIn.next(true);
            console.log("Logged In value sign in ", this.loggedIn.value)  
            this.router.navigate(['/home/inventory']);

          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
      // Sign in with Google
    GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }


    // Sign in with Google
    FacebookAuth() {
      return this.AuthLogin(new auth.FacebookAuthProvider());
    }
    // Sign in with Google
    TwitterAuth() {
      return this.AuthLogin(new auth.TwitterAuthProvider());
    }    
    // Auth logic to run auth providers
    AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
            console.log("Auth but trying to navigate to route");
            
            this.loggedIn.next(true);            
            this.router.navigate(['/home/inventory']);
          })
          this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
      /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      console.log("data user id", user.uid);
      console.log("data user disp name", user.displayName);
      console.log("data user phot ", user.photoURL);
      console.log("data user verified", user.emailVerified);

      const userData: User = {
        
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userData, {
        merge: true
      })
    }
    // Returns true when user is looged in and email is verified
    get LoggedIns(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log("Logged In value loggedins function",(user !== null && user.emailVerified !== false) ? true : false)
      return ( ((user !== null && user.emailVerified !== false)) ? true : false);
    }    
      // Sign out 
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        this.loggedIn.next(false);
      })
    }
}


