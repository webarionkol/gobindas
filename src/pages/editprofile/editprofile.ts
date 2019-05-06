import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { ProductdetailsPage } from '../productdetails/productdetails';
import { MyacountPage } from '../myacount/myacount';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
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
    this.logedUser = this.localApi.getUser();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }
  


  checkExist(data){
  	if (data.logName==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your full name','OK');
      return false;
    } else
    if (data.email==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your email','OK');
      return false;
    }else
    if (data.address==null) {
      this.serviceApi.openAlerts('Alert!','Please enter address','OK');
      return false;
    }   else
    if (data.userPostcode==null) {
      this.serviceApi.openAlerts('Alert!','Please enter postcode','OK');
      return false;
    } else {
      
      this.signup(data);

    }
    

    

  }

  signup(data){
    this.serviceApi.loadingOpen('Please wait ! we are checking the data..');
    this.serviceApi.updateProfile({data:data, userid:this.logedUser.loginId}).subscribe(resp => {
    	this.localApi.setUser(resp);
      this.gologinPage();
      this.serviceApi.loadingClose();
    }, err=>{
      console.log(err);
    });
  }

  gologinPage() {
    let confirm = this.alertCtrl.create({
      title: 'Great!',
      message: 'You have succesfully updated your profile.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(MyacountPage);
          }
        }
      ]
    });
    confirm.present();
  }



}
