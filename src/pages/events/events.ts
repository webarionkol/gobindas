import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';
import { EventDetailPage } from '../event-detail/event-detail';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  catData : any;
  imgPath : any;
  appSetng : any;
  sldBranch : any;
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
  
  
      this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
      this.serviceApi.getAllEvent().subscribe(data => {
        this.catData = data;
          this.serviceApi.loadingClose();
        }, err=>{
          console.log(err);
        });
  
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  openEvent(evt) {
    console.log(evt);
    this.navCtrl.push(EventDetailPage, {evt: evt});
  }

}
