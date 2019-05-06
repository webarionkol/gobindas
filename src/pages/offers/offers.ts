import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';
import { Clipboard } from '@ionic-native/clipboard';

import { BranchesPage } from '../branches/branches';

@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
offerData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              private clipboard: Clipboard,
              public toastCtrl: ToastController
              ) {
  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();
    let logId = '';
    if (this.logedUser) {
    	logId = this.logedUser.loginId;
    } else {
    	logId = '';
    }

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getAllOffers(logId).subscribe(data => {
      this.offerData = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }
  offerCopy(val){
    this.clipboard.copy(val);
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Code copied to clipboard!",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
