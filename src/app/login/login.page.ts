import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../providers/user-data';
import { UserOptions } from '../interfaces/user-options';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  private login: UserOptions = { username: '', password: '', email: '', mobile: '' };
  private submitted = false;

  constructor(public userData: UserData,
    public router: Router,
  ) {}

  ngOnInit() {
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      await this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/home');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}