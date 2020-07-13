import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import  { Storage } from '@ionic/storage';

import { UserService } from '../services/user.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements AfterViewInit {
  title: string = 'account.title';
  username: string;

  constructor(public alertCtrl: AlertController,
    public router: Router,
    private storage: Storage,
    public userAPI: UserService) { }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userAPI.setEmail(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async getUsername() {
    await this.storage.get('email').then((value) => {
      if (value) {
        this.username = value;
      }
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userAPI.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}
