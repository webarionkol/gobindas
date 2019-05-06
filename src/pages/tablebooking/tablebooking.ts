import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { LoginPage } from '../login/login';

/**
 * Generated class for the TablebookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tablebooking',
  templateUrl: 'tablebooking.html',
})
export class TablebookingPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any = {};
data : any = {};
startDate : any;
enddate : any;
logChk : any;
bkng : any;
logedid : any;
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
    this.startDate = this.appSetng.tomorrowDate;
    if (this.logedUser) {
    	this.logChk = true;
      this.logedid = this.logedUser.loginId;
    } else {
    	this.logChk = false;
      this.logedid = 0;
    }

  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.gettableBooingDesc().subscribe(data => {
      this.catrData = data[0];
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });


    
    this.serviceApi.gettablebooking(this.logedid).subscribe(data => {
      this.bkng = data;
      }, err=>{
        console.log(err);
      });


  }
  ionViewDidLoad() {
    
  }
  gologin(){
  	this.navCtrl.push(LoginPage);
  }
  bookNowPage(data){
    if(data.bookingdate==null) {
      this.serviceApi.openAlerts('Alert!','Please enter booking date','OK');
      return false;
    } else if(data.bookingtime==null) {
      this.serviceApi.openAlerts('Alert!','Please enter booking number','OK');
      return false;
    }  else {
      this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      this.serviceApi.tablebookingSend({data:data,userid:this.logedUser.loginId}).subscribe(resp => {
        console.log(resp);
        this.serviceApi.openAlerts('Success!',this.appSetng.tablebookingmessage,'OK');
          this.serviceApi.loadingClose();
        }, err=>{
          console.log(err);
        });
    }

    
  }




}
