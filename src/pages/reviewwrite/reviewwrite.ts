import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';


import { ReviewsPage } from '../reviews/reviews';

/**
 * Generated class for the ReviewwritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviewwrite',
  templateUrl: 'reviewwrite.html',
})
export class ReviewwritePage {
catrData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
logedUser : any = {};
data : any = {};
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
    this.serviceApi.getAllReviews().subscribe(rsp => {
      this.catrData = rsp;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

  }
  ionViewDidLoad() {
    
  }
  submitReview(data){
    if (data.reviewtxt==null) {
      this.serviceApi.openAlerts('Alert!','Please enter your review','OK');
      return false;
    }else {
      this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      this.serviceApi.savereviews({rvData:data, userid:this.logedUser.loginId}).subscribe(resp => {
          this.serviceApi.loadingClose();
          this.goRevwPage();
        }, err=>{
          console.log(err);
        });
    }

    
  }





  goRevwPage() {
    let confirm = this.alertCtrl.create({
      title: 'Great!',
      message: 'You have succesfully submitted your review. Please wait we will approve your review.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(ReviewsPage);
          }
        }
      ]
    });
    confirm.present();
  }




  startratings() {
    const prompt = this.alertCtrl.create({
      title: 'Rate and write',
      //message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'review',
          placeholder: 'Enter review'
        },
         {
          name: 'rating',
          placeholder: 'Enter star rating. e.g.: 5',
          type: 'tel',
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
          text: 'Submit',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }




}
