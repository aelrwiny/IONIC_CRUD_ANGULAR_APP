import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full'
      },
      { 
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'add-product',
        loadChildren: () => import('../add-product/add-product.module').then(m => m.AddProductPageModule)
      },
      {
        path: 'edit-product/:id',
        loadChildren: () => import('../edit-product/edit-product.module').then(m => m.EditProductPageModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('../details/details.module').then(m => m.DetailsPageModule)
      },
      { 
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}