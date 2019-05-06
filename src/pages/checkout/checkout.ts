import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';


import { CategoryPage } from '../category/category';
import { LoginPage } from '../login/login';
import { OrdertypePage } from '../ordertype/ordertype';
import { AddressbookPage } from '../addressbook/addressbook';
import { PaymethodPage } from '../paymethod/paymethod';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
imgPath : any;
appSetng : any;
sldBranch : any;
isCartVal : any;
mycart : any;
crtTotal : any;
crtItmCnt : any;
cpnApplyed : any;
logedUser : any;
extraSuggn : any;
orderType : any;
discountTotal: any;
discountTextValue : any;
payAmount : any;
v1DelvertCost : any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              ) {
  	//this.cart.removeCart();
  	this.imgPath = this.localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.mycart = this.cart.getcart();
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.logedUser = this.localApi.getUser();
    this.extraSuggn = localStorage.getItem("extraComment");
    this.orderType = localStorage.getItem("orderType");
    this.v1DelvertCost = localStorage.getItem("v1DelvertCost");


    var payedAmount = localStorage.getItem('payAmount');
    if (payedAmount) {
      this.payAmount = payedAmount;
    } else {
      this.payAmount = this.crtTotal;
    }

    if (this.orderType=='Delivery') {
      var pamnt = parseFloat(this.payAmount)+parseFloat(this.v1DelvertCost);
      this.payAmount = pamnt.toFixed(2);
    } else {
      this.payAmount = this.payAmount;
    }



    this.discountTextValue = localStorage.getItem('discountTextValue');
    this.discountTotal = localStorage.getItem('discountTotal');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  gocategoryPage(){
    this.navCtrl.setRoot(CategoryPage);
  }
  goNextPage(){
    this.navCtrl.push(PaymethodPage);
  }

}
