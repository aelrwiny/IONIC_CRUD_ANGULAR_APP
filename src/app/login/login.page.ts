import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  title: string = 'login.title';
  private login: any = { email: '', password: '' };
  private submitted = false;

  constructor(private router: Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private userAPI: UserService) {}

  ngOnInit() {}

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
      this.login = {email: email, password: password};
      this.userAPI.loginUser(this.login)
          .then((res) => {
            if (res) {
              window.dispatchEvent(new CustomEvent('user:login'));
              this.router.navigateByUrl('/app/tabs/home');
            }
          }, (err) => {
          });
        }
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      const loading = await this.loadingController.create({ message: 'Loging in...' });
      await loading.present();
      this.userAPI.loginUser(this.login).then(res => {
        window.dispatchEvent(new CustomEvent('user:login'));
        this.router.navigateByUrl('/app/tabs/home');
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}