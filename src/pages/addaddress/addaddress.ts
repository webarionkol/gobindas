import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { AddressbookPage } from '../addressbook/addressbook';

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {
data : any = {};
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
              ) {

  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();

  	


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  addNewAddress(val){
  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.saveMyAddress({addrData:val, userid:this.logedUser.loginId}).subscribe(data => {
     
        this.serviceApi.loadingClose();
        this.goAddressPage();
      }, err=>{
        console.log(err);
      });
  }

   goAddressPage() {
    let confirm = this.alertCtrl.create({
      title: 'Great!',
      message: 'You have succesfully added a new address.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(AddressbookPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
