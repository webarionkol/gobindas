import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { LoginPage } from '../login/login';
import { ReviewwritePage } from '../reviewwrite/reviewwrite';

/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
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
      console.log(rsp);
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

  checkLogin(){
  	if (this.logedUser) {
  		this.startratings();
  	} else {
  		this.showConfirm();
  	}
  }



  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Login Alert!',
      message: 'If you want to rate or write something, please login and try again',
      buttons: [
        {
          text: 'No this time',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Login',
          handler: () => {
            this.navCtrl.push(LoginPage);
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

  revwRwit(){
    if (this.logedUser) {
      this.navCtrl.push(ReviewwritePage);
    } else {
      this.navCtrl.push(LoginPage,{redPage:ReviewsPage});
    }
    
  }



}
