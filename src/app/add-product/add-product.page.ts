import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})

export class AddProductPage implements OnInit {

  addProductForm: FormGroup;

  constructor(private productAPI: ProductService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone) {
    this.addProductForm = this.fb.group({
        product_name: ['', Validators.required],
        product_desc: ['', Validators.required],
        product_price: [null, Validators.required]
    });
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.addProductForm.valid) {
      return false;
    } else {
      console.log(this.addProductForm.value);
      this.productAPI.addProduct(this.addProductForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.addProductForm.reset();
            this.router.navigate(['/app/tabs/home']);
          })
        });
    }
  }

}
