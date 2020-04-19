import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from '../app/shared/services/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit  {
  isLoggedIn$ = false;
  isLoggedins;

  console=console;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inventory',
      url: '/home/inventory',
      icon: 'basket'
    },
    {
      title: 'Settings',
      url: '/home/settings',
      icon: 'construct'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService

  ) {
    this.initializeApp();

    this.authService.isLoggedIn.subscribe((_user) =>
    {
      this.isLoggedIn$ = _user
    }) 

    //this.isLoggedIn$ = this.authService.LoggedIns
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    const path = window.location.pathname.split('home/')[1];
	console.log("path variable", path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
	  console.log("selected index", this.selectedIndex);
    }

    
  }
}
