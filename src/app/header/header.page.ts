import { Component, OnInit, Input } from '@angular/core';

import { Platform } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { DocumentService } from './../services/document.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  @Input("isShowMenu") isShowMenu: boolean;
  @Input("isShowBack") isShowBack: boolean;
  @Input("isShowLocale") isShowLocale: boolean;
  @Input("title") title: string;

  constructor(private platform: Platform,
    private translate: TranslateService,
    private documentService: DocumentService) {}

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.platform.ready().then(() => {
      if (language === 'ar') {
        this.translate.use('ar');
        this.documentService.setDirection('rtl');
        document.dir = 'rtl';
      } else if (language === 'en') {
        this.translate.use('en');
        this.documentService.setDirection('ltr');
      }
    });
  }
}