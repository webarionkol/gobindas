//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//import { SubcategoryPage } from '../../pages/subcategory/subcategory';

@Injectable()
export class RouteProvider {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello RouteProvider Provider');
  }

  // push(nav){
  // 	this.navCtrl.push(SubcategoryPage);
  // }
}
