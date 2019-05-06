import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';

/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
ordernumber : any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              ) {
  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();
    this.ordernumber = this.navParams.get('ordernumber');

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getOrderDetails(this.ordernumber).subscribe(data => {
      this.catrData = data[0];
      console.log(this.catrData);
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }


  


}
