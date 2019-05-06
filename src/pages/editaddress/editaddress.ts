import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { AddressbookPage } from '../addressbook/addressbook';

/**
 * Generated class for the EditaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html',
})
export class EditaddressPage {
adrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
data : any = {};
adrsId : any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              ) {
  	this.adrsId = this.navParams.get('addressid');
  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getThisAddress(this.adrsId).subscribe(resp => {
      this.data = resp[0];
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  savethisAddress(data){
      this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      this.serviceApi.updateAddress({adrsData:data, addressid: this.adrsId}).subscribe(resp => {
          this.serviceApi.loadingClose();
          this.gobackPage();
        }, err=>{
          console.log(err);
        });
  }

   gobackPage() {
    let confirm = this.alertCtrl.create({
      title: 'Well Done!',
      message: 'You have succesfully updated this address.',
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
