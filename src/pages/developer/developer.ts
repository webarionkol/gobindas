import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';

/**
 * Generated class for the DeveloperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-developer',
  templateUrl: 'developer.html',
})
export class DeveloperPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
ordernumber : any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              private iab: InAppBrowser,
              ) {
  	this.imgPath = localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.logedUser = this.localApi.getUser();

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getDeveloperDetails().subscribe(data => {
      this.catrData = data[0];
      console.log(this.catrData);
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }

  openNavigation(val){
  //window.open('maps://0,0?q='+latitude+','+longitude+'('+title+')','_system');
  window.open('geo://?q=' + val, '_system');
}

  callNumber(val){
    window.open('tel:'+val);
  }
  callEmail(val){
    window.open('mailto:'+val, '_system');
  }
  callWeb(val){
    const browser = this.iab.create(val,'_self');
  }


}
