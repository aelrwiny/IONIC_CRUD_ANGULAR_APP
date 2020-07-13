import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  title: string = 'home.title';
  products: any = [];

  constructor(private router: Router,
    private storage: Storage,
    private productService: ProductService,
    private userAPI: UserService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.productService.getProductList().subscribe((res) => {
      this.products = res;
    });
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
