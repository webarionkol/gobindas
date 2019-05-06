import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { AddaddressPage } from '../addaddress/addaddress';
import { EditaddressPage } from '../editaddress/editaddress';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the AddressbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addressbook',
  templateUrl: 'addressbook.html',
})
export class AddressbookPage {
adrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
chkDelAdr : any;
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

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getMyAddress(this.logedUser.loginId).subscribe(data => {
      this.adrData = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  addAddress(val){
  	this.navCtrl.push(AddaddressPage);
  }

  selectAddrs(val){

    this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.checkDelAddress(val.postcode,this.sldBranch.postCode).subscribe(data => {
      this.chkDelAdr = data[0];
      if (this.chkDelAdr.deliveryPrice=='NO') {
        this.serviceApi.openAlerts('Sorry! Too far!',this.chkDelAdr.errorText,'OK');
      } else {
        localStorage.setItem("v1SelectedDeveryAddress", JSON.stringify(val));
        localStorage.setItem("v1DelvertCost", this.chkDelAdr.deliveryPrice);
        this.navCtrl.push(CheckoutPage);
      }
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });


    
  }

  deleteAddress(addressid){
    this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.deleteMyAddress(addressid).subscribe(data => {
        this.serviceApi.loadingClose();

        this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
        this.serviceApi.getMyAddress(this.logedUser.loginId).subscribe(data => {
          this.adrData = data;
            this.serviceApi.loadingClose();
          }, err=>{
            console.log(err);
          });

    
      }, err=>{
        console.log(err);
      });
  }

  deleteConfirm(val) {
    let confirm = this.alertCtrl.create({
      title: 'Delete!',
      message: 'Are you sure you want to delete this address',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes! Delete',
          handler: () => {
            this.deleteAddress(val);
          }
        }
      ]
    });
    confirm.present();
  }

  EditPage(val){
    this.navCtrl.push(EditaddressPage,{addressid:val});
  }

}
