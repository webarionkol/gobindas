import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';
import { LocalProvider } from '../../providers/local/local';
import { ServiceProvider } from '../../providers/service/service';


import { AddressbookPage } from '../addressbook/addressbook';
import { CheckoutPage } from '../checkout/checkout';
/**
 * Generated class for the OrdertypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordertype',
  templateUrl: 'ordertype.html',
})
export class OrdertypePage {
sldBranch : any;
crtTotal : any;
appSetng : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cart: CartProvider,public localApi : LocalProvider,public serviceApi : ServiceProvider) {
    this.sldBranch = this.localApi.getMyBranch();
    this.crtTotal = this.cart.getcarttotal();
    this.appSetng = this.localApi.getSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdertypePage');
  }
  getOrderType(val){
  	localStorage.setItem('orderType', val);
  	if (val=='Delivery') {

      var crtTotal = this.cart.getcarttotal();
      var morePr = parseFloat(this.appSetng.fordelivery) - parseFloat(crtTotal);

      if (parseFloat(this.appSetng.fordelivery) <= parseFloat(crtTotal)) {
        this.navCtrl.push(AddressbookPage);
      } else {
        this.serviceApi.openAlerts('Alert!','Minimum cart value required '+this.appSetng.currency+this.appSetng.fordelivery+', Please add more '+this.appSetng.currency+morePr.toFixed(2)+' to deliver items your home','OK');
      }
  		




  	} else {
  		this.navCtrl.push(CheckoutPage);
  	}
  }

}
