import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';
import { OffersPage } from '../offers/offers';
import { FavouritesPage } from '../favourites/favourites';
import { OrderlistPage } from '../orderlist/orderlist';
import { OrderdetailsPage } from '../orderdetails/orderdetails';
import { EditprofilePage } from '../editprofile/editprofile';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { WalletPage } from '../wallet/wallet';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the MyacountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myacount',
  templateUrl: 'myacount.html',
})
export class MyacountPage {
catrData : any;
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

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getMyOrders(this.logedUser.loginId).subscribe(data => {
      this.catrData = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }

logOut() {
    const confirm = this.alertCtrl.create({
      title: 'Alert!',
      message: 'Are you sure want want to logout now?',
      buttons: [
        {
          text: 'Nah!',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            this.localApi.removeUser();
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

goOffers(){
  this.navCtrl.push(OffersPage);
}
goFav(){
  this.navCtrl.push(ProductsPage,{favourites:'Favourites'});
}

moreorders(){
  this.navCtrl.push(OrderlistPage);
}
  goOrdetails(ordernumber){
    this.navCtrl.push(OrderdetailsPage,{ordernumber:ordernumber});
  }



  profileUpdate(){
    this.navCtrl.push(EditprofilePage);
  }
   goWallte(){
    this.navCtrl.push(WalletPage);
  }

}
