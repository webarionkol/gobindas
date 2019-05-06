import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { AddaddressPage } from '../addaddress/addaddress';
import { EditaddressPage } from '../editaddress/editaddress';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the CompleteorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completeorder',
  templateUrl: 'completeorder.html',
})
export class CompleteorderPage {
adrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
ordernumber : any
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              ) {
    this.ordernumber = this.navParams.get('orderId');
  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();
    this.localApi.removeAllStoreage();
    this.cart.removeCart();
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }


}
