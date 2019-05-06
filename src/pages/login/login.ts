import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
data : any = {};
redPage : any;
myToken : any;
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
    this.redPage = this.navParams.get('redPage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }
  goRegisterPage(){
  	this.navCtrl.push(SignupPage);
  }

  login(data){

     if (data.mobile==null) {
      this.serviceApi.openAlerts('Alert!','Please enter registered mobile number','OK');
      return false;
    }   else
    if (data.password==null) {
      this.serviceApi.openAlerts('Alert!','Please enter password','OK');
      return false;
    } else {
      
      this.serviceApi.loadingOpen('Please wait ! we are checking the data..');
      this.myToken = localStorage.getItem("myDeviceToken");
        this.serviceApi.getlogin({loginData: data, deviceToken:this.myToken}).subscribe(resp => {
            if (resp.statusProcess=='false') {
              this.serviceApi.loadingClose();
              this.serviceApi.openAlerts('Opps!','Wrong login details','OK');
            } else {
              this.localApi.setUser(resp);
              this.serviceApi.loadingClose();
              if (this.redPage) {
                this.navCtrl.setRoot(this.redPage);
              } else {
                this.navCtrl.setRoot(HomePage);
              }
              
            }
          
        }, err=>{
          console.log(err);
        });

    }
  }

}
