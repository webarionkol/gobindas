import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { BranchesPage } from '../branches/branches';

/**
 * Generated class for the CateringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catering',
  templateUrl: 'catering.html',
})
export class CateringPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
data : any = {};
startDate : any;
enddate : any;
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


  	this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getCateringDesc().subscribe(data => {
      this.catrData = data[0];
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }
  bookNowPage(data){
    if (data.name==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your full name','OK');
      return false;
    } else if(data.mobile==null) {
      this.serviceApi.openAlerts('Alert!','Please enter contact number','OK');
      return false;
    } else if(data.eventdate==null) {
      this.serviceApi.openAlerts('Alert!','Please enter event date','OK');
      return false;
    } else {
      this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      this.serviceApi.cateringEnq(data).subscribe(resp => {
        console.log(resp);
        this.serviceApi.openAlerts('Success!',this.appSetng.cateringenqmessage,'OK');
          this.serviceApi.loadingClose();
        }, err=>{
          console.log(err);
        });
    }

    
  }




}
