import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
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
    this.serviceApi.getTerms().subscribe(data => {
      this.catrData = data[0];
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }




}

