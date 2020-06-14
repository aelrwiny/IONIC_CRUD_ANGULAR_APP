import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AddProductPageModule } from '../add-product/add-product.module';
import { EditProductPageModule } from '../edit-product/edit-product.module';
import { HomePageModule } from '../home/home.module';
import { DetailsPageModule } from '../details/details.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AddProductPageModule,
    EditProductPageModule,
    DetailsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
