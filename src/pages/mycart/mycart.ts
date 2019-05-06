import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';


import { CategoryPage } from '../category/category';
import { LoginPage } from '../login/login';
import { OrdertypePage } from '../ordertype/ordertype';
import { AddressbookPage } from '../addressbook/addressbook';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {
imgPath : any;
appSetng : any;
sldBranch : any;
isCartVal : any;
mycart : any;
crtTotal : any;
crtItmCnt : any;
cpnApplyed : any;
logedUser : any;
chCode : any;
discountTotal: any;
discountTextValue : any;
payAmount : any;
howManyDiduct : any;
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
    this.payAmount = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.logedUser = this.localApi.getUser();
    localStorage.removeItem("v1TakeVariation");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
    localStorage.removeItem('extraComment');
    localStorage.removeItem('payAmount');
    localStorage.removeItem('applyedCoupon');
    localStorage.removeItem('discountTextValue');
    localStorage.removeItem('discountTotal');
    localStorage.removeItem('v1TakeChooseItem');
    localStorage.removeItem('v1TakeChooseItem');
    
  }

  minusqnty(item){
    this.cpnApplyed = false;
    this.cart.minusqntyfrmprod(item);
    this.crtTotal = this.cart.getcarttotal();
    this.mycart = this.cart.getcart();
    this.crtItmCnt = this.cart.getItemCount();
    localStorage.removeItem('payAmount');
    localStorage.removeItem('applyedCoupon');
    localStorage.removeItem('discountTextValue');
    localStorage.removeItem('discountTotal');
  }
  plusqnty(item){
    this.cpnApplyed = false;
    this.cart.plusqnty(item);
    this.crtTotal = this.cart.getcarttotal();
    this.mycart = this.cart.getcart();
    this.crtItmCnt = this.cart.getItemCount();
    localStorage.removeItem('payAmount');
    localStorage.removeItem('applyedCoupon');
    localStorage.removeItem('discountTextValue');
    localStorage.removeItem('discountTotal');

  }

  setComments(val){
  	localStorage.setItem('extraComment', val);

  }

  applyCoupon(){
	  	const prompt = this.alertCtrl.create({
	      title: 'Apply Coupon',
	      message: "Please enter coupon code",
	      inputs: [
	        {
	          name: 'couponcode',
	          placeholder: 'Enter coupon here..'
	        },
	      ],
	      buttons: [
	        {
	          text: 'Cancel',
	          handler: data => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: 'Apply',
	          handler: data => {
              //console.log(data.couponcode);
              this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
              this.serviceApi.checkDiscountCode(data.couponcode,this.crtTotal,this.logedUser.loginId).subscribe(resp => {
                this.chCode = resp[0];
                
                if (this.chCode.codeStatus=='Not Valid') {
                  this.serviceApi.openAlerts('Alert!',this.chCode.errorText,'OK');
                  this.serviceApi.loadingClose();
                } else {
                  this.cpnApplyed = data.couponcode;
                  if (this.chCode.offerType=='Percentage') {
                    this.howManyDiduct =  (this.crtTotal*this.chCode.offerValue)/100;
                    var afterDiduct = parseFloat(this.crtTotal)-parseFloat(this.howManyDiduct);
                    this.discountTotal = '- '+this.appSetng.currency+this.howManyDiduct.toFixed(2);
                    this.discountTextValue = this.chCode.offerValue+'% Discount';
                    this.payAmount = afterDiduct.toFixed(2);
                  } else if(this.chCode.offerType=='Flat'){
                    var afterDiduct = parseFloat(this.crtTotal)-parseFloat(this.chCode.offerValue);
                    var fltval = parseFloat(this.chCode.offerValue);
                    this.discountTotal = '- '+this.appSetng.currency+fltval.toFixed(2);
                    this.discountTextValue = 'Flat '+this.appSetng.currency+this.chCode.offerValue+' Discount';
                    this.payAmount = afterDiduct.toFixed(2);
                  } else {
                    this.payAmount = this.crtTotal;
                    this.discountTotal = this.chCode.offerValue+' points';
                    this.discountTextValue = 'Will earn '+this.chCode.offerValue+' points';
                  }

                  localStorage.setItem('discountTotal', this.discountTotal);
                  localStorage.setItem('discountTextValue', this.discountTextValue);
                  localStorage.setItem('payAmount', this.payAmount);
                  localStorage.setItem('applyedCoupon', JSON.stringify(this.chCode));
                  this.serviceApi.loadingClose();
                }
                  
                }, err=>{
                  console.log(err);
                  this.serviceApi.loadingClose();
                });
	            
	          }
	        }
	      ]
	    });
	    prompt.present();
	}

  removeCoupon(){

    const confirm = this.alertCtrl.create({
      title: this.cpnApplyed+', coupon applied',
      message: 'Are you sure you want to remove the applied coupon?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.cpnApplyed = '';
            localStorage.removeItem('payAmount');
            localStorage.removeItem('applyedCoupon');
            localStorage.removeItem('discountTextValue');
            localStorage.removeItem('discountTotal');
            
          }
        }
      ]
    });
    confirm.present();


    
  }

  gocategoryPage(){
    this.navCtrl.setRoot(CategoryPage);
  }
  goNextPage(){

    var shpCl = localStorage.getItem("shpCls");
    if (shpCl) {
      this.serviceApi.openAlerts('Alert!',this.sldBranch.openTimeTxt+'. '+this.sldBranch.openTimeToday,'OK');
    } else {
      var crtTotal = this.cart.getcarttotal();
      var morePr = parseFloat(this.appSetng.forcheckout) - parseFloat(crtTotal);
      if (parseFloat(this.appSetng.forcheckout) <= parseFloat(crtTotal)) {
       
       if (this.logedUser) {
        if (this.appSetng.delivery=='ON' && this.appSetng.takeaway=='ON') {
          this.navCtrl.push(OrdertypePage);
        }
        if (this.appSetng.delivery=='ON' && this.appSetng.takeaway=='OFF') {
          localStorage.setItem('orderType', 'Delivery');
          this.navCtrl.push(AddressbookPage);
        }
        if (this.appSetng.delivery=='OFF' && this.appSetng.takeaway=='ON') {
          localStorage.setItem('orderType', 'Takeaway');
          this.navCtrl.push(CheckoutPage);
        }
        
      } else {
        this.navCtrl.push(LoginPage,{redPage:MycartPage});
      }

      } else {
        this.serviceApi.openAlerts('Alert!','Minimum cart value required '+this.appSetng.currency+this.appSetng.forcheckout+', Please add more '+this.appSetng.currency+morePr.toFixed(2)+' to continue checkout','OK');

      }
    }
    

  }

}
