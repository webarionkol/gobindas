import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';

/**
 * Generated class for the BranchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branches',
  templateUrl: 'branches.html',
})
export class BranchesPage {
brnch : any;
imgPath : any;
  constructor(public navCtrl: NavController,
  			      public navParams: NavParams,
  		        public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              ) {

  	this.imgPath = localApi.getImgPath();
    let myLat = localStorage.getItem("myLat");
    let myLong = localStorage.getItem("myLong");

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getAllBranches(myLat,myLong).subscribe(data => {
      this.brnch = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });
    localStorage.removeItem("shpCls");
    this.cart.removeCart();
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  setUserBranch(val){
    this.localApi.setMyBranch(val);
    this.menu.swipeEnable(true);
    this.navCtrl.setRoot(HomePage);
  }

}
