import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  title: string = 'details.title';
  private product: any = null;
  private id: any;

  constructor(public productAPI: ProductService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController) {}

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      const loading = await this.loadingController.create({ message: 'Loading...' });
      await loading.present();
      this.productAPI.getProduct(this.id).subscribe(res => {
        this.product = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    }
  }

  async delete(id) {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    this.productAPI.deleteProduct(id).subscribe(res => {
      loading.dismiss();
      this.router.navigate(['/app/tabs/home']);
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });
  
    await alert.present();
  }
}
