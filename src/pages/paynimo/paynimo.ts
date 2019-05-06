import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';


import { CompleteorderPage } from '../completeorder/completeorder';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
  selector: 'page-paynimo',
  templateUrl: 'paynimo.html',
})
export class PaynimoPage {
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
  data : any = {};
  paystatus: any;

  public browser;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceApi : ServiceProvider,
    public localApi : LocalProvider,
    public alertCtrl: AlertController,
    private menu : MenuController,
    private cart: CartProvider,
    private iab: InAppBrowser
    //private payPal: PayPal
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
    var payedAmount             = localStorage.getItem('payAmount');

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

  checkPayment(data){
    if (!data.cardholder) {
      this.serviceApi.openAlerts('Alert!','Please enter card holder name','OK');
      return false;
    } else if (!data.cardnumber) {
      this.serviceApi.openAlerts('Alert!','Please enter card number','OK');
      return false;
    } else if (!data.expirydate) {
      this.serviceApi.openAlerts('Alert!','Please select expiry date','OK');
      return false;
    } else if (!data.cvv) {
      this.serviceApi.openAlerts('Alert!','Please enter cvv number','OK');
      return false;
    } else {
      this.serviceApi.paynimoPayment(this.payAmount,data.cardholder,data.cardnumber,data.expirydate,data.cvv).subscribe(resp => {
        this.browser = this.iab.create(resp,  '_blank', 'location=no');
        this.browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {
          console.log("event",event);
          if(event.url == 'http://www.etefag.com/Paynimo/process.php'){
            this.browser.close();
            this.makePayment();
          }
        })
        console.log("resp.text()",resp);
      })
      // this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      //   this.serviceApi.stripepayment({cardData:data, totalPay:this.payAmount, paygetaway:'Stripe'}).subscribe(resp => {
      //     this.paystatus = resp.paymentStatus;
      //     if (this.paystatus.error=='Token error') {
      //       this.serviceApi.loadingClose();
      //       this.serviceApi.openAlerts(this.paystatus.error,this.paystatus.details.jsonBody.error.message,'OK');
      //     } else {
      //       this.serviceApi.loadingClose();
      //       this.makePayment();
      //     } 
      //   }, err=>{
      //     console.log(err);
      // });
    }
  }

  
    makePayment(){
      if (this.deliveryAddress) {
        this.delAddid = this.deliveryAddress.addressid;
      } else {
        this.delAddid = '';
      }
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
        payMethod:'Paynimo'
      }).subscribe(resp => {
        this.serviceApi.loadingClose();
        this.navCtrl.setRoot(CompleteorderPage,{orderId:resp.orderId});
      }, err=>{
        console.log(err);
      });
    }

}
