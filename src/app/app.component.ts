import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    // {
    //   title: 'Todo',
    //   url: '/todos',
    //   icon: 'book'
    // },
    {
      title: 'Photograph',
      url: '/photograph',
      icon: 'camera'
    },
    {
      title: 'Record',
      url: '/record',
      icon: 'url'
    },
    {
      title: 'Education',
      url: '/education',
      icon: 'book'
    },
    {
      title: 'Advisor',
      url: '/advisor',
      icon: 'person'
    }
  ];

  isLoggedin = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.authChange.subscribe( authStatus => {
      this.isLoggedin = authStatus;
    });
  }

  onLogout() {
    this.authService.logout();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
