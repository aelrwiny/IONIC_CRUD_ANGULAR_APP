import { Component } from '@angular/core';

import { CheckHome } from '../providers/check.home.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  constructor(private checkHome: CheckHome) {}

  ionViewWillEnter() {
    this.checkHome.canLoad();
  }
}