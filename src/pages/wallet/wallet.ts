import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any;
worthprice : any;
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

    var worthprice = parseFloat(this.logedUser.wallet)/parseFloat(this.appSetng.pointforbuyitem)
    this.worthprice = worthprice.toFixed(2);


  }
  ionViewDidLoad() {
    
  }

openPointCalc() {
    const prompt = this.alertCtrl.create({
      title: 'Buy Point',
      message: '',
      subTitle: this.appSetng.pointforbuyitem+" Points = "+this.appSetng.currency+"1.00",
      inputs: [
        {
          name: 'amounttobuy',
          placeholder: 'Please enter amount',
          type: 'tel',
          id: 'amounttobuy'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed to Payment',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
    //document.getElementById("amounttobuy").setAttribute('class','asdasd');
  }

}
