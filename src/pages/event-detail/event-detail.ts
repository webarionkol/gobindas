import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  catItem:any;
  imgPath : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public localApi : LocalProvider
  ) {
    this.imgPath = localApi.getImgPath();
    this.catItem = this.navParams.get('evt');
    console.log(this.catItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
