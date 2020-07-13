import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CheckHome implements CanLoad {
  
  constructor(private storage: Storage,
    private router: Router,
    private userAPI: UserService) {}

  async canLoad() {
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
    let isLoggedIn: boolean = false;
    await this.storage.get('loggedIn').then((value) => {
      console.log(JSON.stringify(value));
      if (value && value == '1') {
        console.log("CheckHome Value = = = = = = = " + JSON.stringify(value));
        isLoggedIn = true;
      } else {
        if (email && password) {
          let user: User;
          let login: any = {email: email, password: password};
          this.userAPI.loginUser(login)
              .then((res) => {
                if (res) {
                  isLoggedIn =  true;
                } else {
                  isLoggedIn =  false;
                }
              }, (err) => {
              });
        }
      }
    });

    console.log("isLoggedIn Value = = = = = = = " + isLoggedIn);
    if (isLoggedIn) {
      console.log("Dispatching Value = = = = = = = user:login");
      window.dispatchEvent(new CustomEvent('user:login'));
      return true;
    } else {
      console.log("Dispatching Value = = = = = = = user:logout");
      window.dispatchEvent(new CustomEvent('user:logout'));
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
