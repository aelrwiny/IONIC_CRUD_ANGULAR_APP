import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ProductService } from '../shared/product.service';
import { UserData } from '../providers/user-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  products: any = [];

  constructor(private router: Router,
    private storage: Storage,
    private productService: ProductService,
    private userData: UserData
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    let loggedIn = this.userData.isLoggedIn();
    if (loggedIn) {
      this.productService.getProductList().subscribe((res) => {
        this.products = res;
      })
    } else {
        this.router.navigateByUrl('/login');
    }
  }

  deleteProduct(product) {
    if (window.confirm('Do you want to delete product?')) {
      var index: any = this.products.findIndex(x => x._id === product._id);
      this.productService.deleteProduct(product._id)
        .subscribe(() => {
          this.products.splice(index, 1);
          console.log('Product deleted!')
        }
        )
    }
  }
}
