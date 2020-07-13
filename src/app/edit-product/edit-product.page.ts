import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, AlertController } from '@ionic/angular';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  title: string = 'edit.title';
  updateProductForm: FormGroup;
  id: any;

  constructor(
    private productAPI: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,) {}

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getProductData(this.id);
    this.updateProductForm = this.fb.group({
      product_name: ['', Validators.required],
      product_desc: ['', Validators.required],
      product_price: [null, Validators.required],
      date_created: null,
      date_updated:  null
    })
  }

  async getProductData(id) {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    loading.present();
    this.productAPI.getProduct(id).subscribe(res => {
      this.updateProductForm.setValue({
        product_name: res['product_name'],
        product_desc: res['product_desc'],
        product_price: res['product_price'],
        date_created: new Date(),
        date_updated: new Date()
      });
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  updateForm() {
    if (!this.updateProductForm.valid) {
      return false;
    } else {
      this.productAPI.updateProduct(this.id, this.updateProductForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateProductForm.reset();
          this.router.navigate(['/app/tabs/home']);
        }, err => {
          console.log(err);
        });
    }
  }
}