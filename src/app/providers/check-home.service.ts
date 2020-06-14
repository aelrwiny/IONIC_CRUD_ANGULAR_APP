import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckHome implements CanLoad {
  
  private username: string = '';
  
  constructor(private storage: Storage, private router: Router) {}

  async canLoad() {
    await this.storage.get('username').then(username => {
      this.username = username;
    });
    if (this.username != null && this.username.length > 0) {
      console.log("CheckHome.canLoad = " + this.username);
      return true;
    } else {
      console.log("Login CheckHome.canLoad = " + this.username);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
