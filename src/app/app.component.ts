import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import  { Storage } from '@ionic/storage';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';

import { User } from './models/user';
import { UserService } from './services/user.service';
import { DocumentService } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  private language: string = 'en';
  private loggedIn = false;
  private dark = false;
  private appPages = [
    {
      titleEn: 'Products',
      titleAr: 'المنتجات',
      url: '/app/tabs/home',
      icon: 'home'
    },
    {
      titleEn: 'Map',
      titleAr: 'الخريطة',
      url: '/map',
      icon: 'map'
    },
    {
      titleEn: 'About',
      titleAr: 'معلومات',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  constructor(private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userAPI: UserService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private documentService: DocumentService) {
      this.platform.ready().then(() => {
        this.initTranslate();
     });
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.initializeApp();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();
      toast.onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  async ionViewWillEnter() {
    let email = '', password = '';
    await this.storage.get('email').then((value) => {
      if (value) {
        email = value;
      }
    });

    await this.storage.get('password').then((value) => {
      if (value) {
        password = value;
      }
    });

    if (email && password) {
      let user: User;
      let login: any = {email: email, password: password};
      this.userAPI.loginUser(login)
          .then((res) => {
            if (res) {
              window.dispatchEvent(new CustomEvent('user:login'));
              return this.router.navigateByUrl('/app/tabs/home');
            }
          }, err => {
            console.log(err);
          });
    }
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userAPI.logout().then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
      return this.router.navigateByUrl('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  private initTranslate() {
    this.translate.setDefaultLang('en');
    this.documentService.setDirection('ltr');
  }

  /*
  changeLanguage() {
    if (this.language === 'ar') {
      this.translate.use('ar');
      this.documentService.setReadingDirection('rtl');
    } else if (this.language === 'en') {
      this.translate.use('en');
      this.documentService.setReadingDirection('ltr');
    }
    this.menu.toggle();
  }
  */

  changeLanguage(language: string) {
    if (language === 'ar') {
      this.translate.use('ar');
      this.documentService.setDirection('rtl');
      this.menu.enable(true, "rtlMenu");
      this.menu.enable(false, "ltrMenu");
    } else if (language === 'en') {
      this.translate.use('en');
      this.documentService.setDirection('ltr');
      this.menu.enable(false, "rtlMenu");
      this.menu.enable(true, "ltrMenu");
    }
  }
}