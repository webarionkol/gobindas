import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';


import { CategoryPage } from '../category/category';
import { LoginPage } from '../login/login';
import { OrdertypePage } from '../ordertype/ordertype';
import { CompleteorderPage } from '../completeorder/completeorder';
import { StripecardPage } from '../stripecard/stripecard';
import { PaynimoPage } from '../paynimo/paynimo';

/**
 * Generated class for the PaymethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymethod',
  templateUrl: 'paymethod.html',
})
export class PaymethodPage {
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
pplCon : any;
discountTextValue : any;
orderType : any;
v1DelvertCost : any;
payAmount : any;
deliveryAddress : any;
delvertCost: any;
offAmount : any;
delAddid : any;
  constructor(public navCtrl: NavController,
          public navParams: NavParams,
            public serviceApi : ServiceProvider,
              public localApi : LocalProvider,
              public alertCtrl: AlertController,
              private menu : MenuController,
              private cart: CartProvider
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
    this.discountTextValue = localStorage.getItem("discountTextValue");
    this.offAmount = localStorage.getItem("discountTotal");
    this.orderType = localStorage.getItem("orderType");
    this.v1DelvertCost = localStorage.getItem("v1DelvertCost");
    this.deliveryAddress = JSON.parse(localStorage.getItem("v1SelectedDeveryAddress"));
    this.delvertCost = localStorage.getItem("v1DelvertCost");
    



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



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  

  makePayment(val){
    if (val=='Cash') {
      this.paybyCash();
    }
    if (val=='Stripe') {
      this.paybyStripe();
    }
    
  }

paybyStripe(){
  this.navCtrl.push(PaynimoPage);  
}
  




  paybyCash(){
    console.log(this.deliveryAddress)
    if (this.deliveryAddress) {
      this.delAddid = this.deliveryAddress.addressid;
    } else {
      this.delAddid = '';
    }
    if(this.extraSuggn){
       
    }else{
       this.extraSuggn=""
    }
    if(this.offAmount){

    }
    else{
      this.offAmount=""
    }
    console.log(
   "0" + this.sldBranch.branchId,
   "1" +   this.logedUser.loginId,
   "2" + this.extraSuggn,
   "3" +JSON.stringify( this.offAmount),
   "4" + this.discountTextValue,
   "5" + this.payAmount,
   "6" + this.mycart,
   "7" + this.orderType,
   "8" +  this.delAddid,
   "9" + this.delvertCost,
    'Cash'
    )

    this.serviceApi.loadingOpen('Please wait, we are fetching your data...');

    this.serviceApi.orderPlace({
           branchid:this.sldBranch.branchId,
           userid:this.logedUser.loginId,
           extraSuggn:this.extraSuggn,
           offAmount:this.offAmount,
           discountTextValue:this.discountTextValue,
           payAmount:this.payAmount,
           products:this.mycart,
           orderType:this.orderType,
           delAddid:this.delAddid,
           delvertCost:this.delvertCost,
           payMethod:'Cash'
         }).subscribe(resp => {
          console.log(resp);
        this.serviceApi.loadingClose();
        this.navCtrl.setRoot(CompleteorderPage,{orderId:resp.orderId});
      
    }, err=>{
      alert(err);
      this.serviceApi.loadingClose();
    });
  }






}
