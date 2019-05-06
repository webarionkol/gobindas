import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { SubcategoryPage } from '../subcategory/subcategory';
import { ProductsPage } from '../products/products';


/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
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
    this.serviceApi.getAllCategory().subscribe(data => {
      this.catData = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  goNextPage(val){
  	console.log(val);
  	if (val.subcategory=='YES') {
  		this.navCtrl.push(SubcategoryPage,{catgegoryName:val.categoryName, catId:val.categoryId});
  	} else {
  		this.navCtrl.push(ProductsPage,{catgegoryName:val.categoryName, catId:val.categoryId,subCatId:'',subSubCatId:''})
  	}
  }

}
