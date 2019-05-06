import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { HomePage } from '../home/home';
import { OffersPage } from '../offers/offers';
import { FavouritesPage } from '../favourites/favourites';
import { MycartPage } from '../mycart/mycart';

/**
 * Generated class for the ItemselectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itemselection',
  templateUrl: 'itemselection.html',
})
export class ItemselectionPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
chooseItem : any;
public allData = [];
myCard : any;
forValid : any;
selectVariantion : any
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
    this.chooseItem = this.localApi.getSelectItem();
    this.selectVariantion = this.localApi.getItemVariation();
    console.log(this.chooseItem);
    this.myCard = 1;
  	// this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
   //  this.serviceApi.getMyOrders(this.logedUser.loginId).subscribe(data => {
   //    this.catrData = data;
   //      this.serviceApi.loadingClose();
   //    }, err=>{
   //      console.log(err);
   //    });

  }
  ionViewDidLoad() {
    
  }

  // goOrdetails(ordernumber){
  //   this.navCtrl.push(OrderdetailsPage,{ordernumber:ordernumber});
  // }



  pushSelect(val,selectCatId){
  	if(this.allData.length == 0){
  		this.allData.push(val);
  		this.forValid = 0;
  	} else {
  		let temp;
  		let position;
  		for(let i in this.allData){
  			if(val.forCheckBox == this.allData[i].forCheckBox){
  				temp = true;
  				position = i;
  				break;
  			} else {
				temp = false;
  			}
  		}
  		if(temp == false){
  			this.allData.push(val);
  			this.forValid = parseFloat(this.forValid)+1;
  		}
  		else{
  			this.allData.splice(position,1);
  			this.forValid = parseFloat(this.forValid)-1;
  		}
  	}
  }

  nextCards(maxQty,nextPanel){
  	console.log(this.forValid);
  	if (this.forValid <= maxQty) {
  		this.forValid = 0;
  		this.myCard = nextPanel;
  		
  		if (!nextPanel) {
  			this.cart.addcart(this.chooseItem,this.selectVariantion,this.allData);
  			this.navCtrl.push(MycartPage);
  		}
  	} else {
  		if (maxQty==0) {
  			this.forValid = 0;
	  		this.myCard = nextPanel;
	  		
	  		if (!nextPanel) {
	  			this.cart.addcart(this.chooseItem,this.selectVariantion,this.allData);
	  			this.navCtrl.push(MycartPage);
	  		}
  		} else {
  			this.serviceApi.openAlerts('Opps!','Please select any '+maxQty+' Choices','OK');
  		}
  		
  	}
  }

}
