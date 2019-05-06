import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';

import { HomePage } from '../home/home';
import { BranchesPage } from '../branches/branches';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
appSetng : any = {};
  constructor(public navCtrl: NavController,
  			      public navParams: NavParams,
  			      public serviceApi : ServiceProvider,
              public localApi : LocalProvider,
              private menu : MenuController,
              ) {
    this.appSetng = this.localApi.getSettings();
  }

  ionViewDidLoad() {
  	this.menu.swipeEnable(false);
    console.log('ionViewDidLoad LandingPage');
  }
  
  startApp(){
    this.appSetng = this.localApi.getSettings();
  	this.localApi.setLanding();
    if (this.appSetng.multiplebranches=='ON') {
      this.navCtrl.setRoot(BranchesPage);
    } else {
      this.navCtrl.setRoot(HomePage);
    }
    
  }

}
