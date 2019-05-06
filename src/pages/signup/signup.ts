import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { ProductdetailsPage } from '../productdetails/productdetails';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
data : any = {};
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }
  goRegisterPage(){
  	this.navCtrl.push(SignupPage);
  }


  checkExist(data){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = data.email;

  	if (data.fullName==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your full name','OK');
      return false;
    } else
    if (data.mobile==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your mobile number','OK');
      return false;
    } else
    if (data.email==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your email','OK');
      return false;
    }else if(reg.test(address) == false) 
    {
      this.serviceApi.openAlerts('Alert!','Please enter valid email','OK');
      return false;
    } else
    if (data.password==null) {
      this.serviceApi.openAlerts('Alert!','Please enter password','OK');
      return false;
    }  else
    if (data.address==null) {
      this.serviceApi.openAlerts('Alert!','Please enter address','OK');
      return false;
    }   else
    if (data.postcode==null) {
      this.serviceApi.openAlerts('Alert!','Please enter postcode','OK');
      return false;
    } else {
     
      this.serviceApi.loadingOpen('Please wait ! we are checking the data..');

        this.serviceApi.checkNumberForReg(data.mobile).subscribe(resp => {
            if (resp.numberExist=='Exist') {
              this.serviceApi.loadingClose();
              this.serviceApi.openAlerts('Alert!','Mobile Number ALready Exist!','OK');
            } else {
              this.serviceApi.loadingClose();
              this.signup(data);
              
            }
          
        }, err=>{
          console.log(err);
        });

    }
    

    

  }

  signup(data){
    this.serviceApi.loadingOpen('Please wait ! we are checking the data..');
    this.serviceApi.getsignup(data).subscribe(data => {
      this.gologinPage();
      this.serviceApi.loadingClose();
    }, err=>{
      console.log(err);
    });
  }

  gologinPage() {
    let confirm = this.alertCtrl.create({
      title: 'Great!',
      message: 'You have succesfully registered. To login, tap Login Now',
      buttons: [
        {
          text: 'Login Now',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }



}

