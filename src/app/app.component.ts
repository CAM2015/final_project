import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/auth.service';
import { FcmService } from './shared/fcm.service';
import { ToastService } from './shared/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'School Listing',
      url: '/home/schools',
      icon: 'school'
    },
    {
      title: 'My Favourites',
      url: '/favourite',
      icon: 'star'
    },
    {
      title: 'What Parents are Saying',
      url: '/blog',
      icon: 'contacts'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private fcm: FcmService,
    private toast: ToastService
  ) {
    this.initializeApp();
    this.notificationSetup();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotification().subscribe(
      (msg) => {
        this.toast.presentToast(msg.body);
        console.log('here');
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
