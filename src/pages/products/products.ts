import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ActionSheetController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { ProductdetailsPage } from '../productdetails/productdetails';
import { MycartPage } from '../mycart/mycart';
import { ItemselectionPage } from '../itemselection/itemselection';
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
imgPath : any;
appSetng : any;
sldBranch : any;
catName : any;
catId : any;
subCatId : any;
subSubCatId : any;
prdAta : any;
isCartVal : any;
mycart : any;
crtTotal : any;
crtItmCnt : any;
thsQty : any;
public allMyFav = [];
pageTypes: any;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  		      public serviceApi : ServiceProvider,
          	  public localApi : LocalProvider,
          	  public alertCtrl: AlertController,
          	  private menu : MenuController,
              private cart: CartProvider,
              public actionSheetCtrl: ActionSheetController
              ) {
    this.allMyFav = this.localApi.getFavorite();
  	this.catId = this.navParams.get('catId');
    this.subCatId = this.navParams.get('subCatId');
    this.subSubCatId = this.navParams.get('subSubCatId');

    this.pageTypes = this.navParams.get('favourites');
    if (this.pageTypes=='Favourites') {
      this.catName = 'Favorites List';
    } else {
      this.catName = this.navParams.get('catgegoryName');
    }

  	this.imgPath = this.localApi.getImgPath();
    this.appSetng = this.localApi.getSettings();
    this.sldBranch = this.localApi.getMyBranch();
    this.mycart = this.cart.getcart();
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    if (this.crtItmCnt > 0) {
      this.isCartVal = true;
    } else {
      this.isCartVal = false;
    }


    this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getAllProducts(this.catId,this.subCatId,this.subSubCatId,this.pageTypes,this.allMyFav).subscribe(data => {
      this.prdAta = data;
      console.log(this.prdAta);
      //let newProducts = [];
      for(let i=0; i<this.prdAta.length; i++){
          let single = this.prdAta[i];
          let qty = this.cart.getSingleQty(single.productId);
          this.prdAta[i].qty = qty;

          let fav = this.localApi.getSingleFav(single.productId);
          if (fav) {
            this.prdAta[i].fav = fav;
          } else {
            this.prdAta[i].fav = 'heart-outline';
          } 
      }
       this.serviceApi.loadingClose();
       console.log(this.prdAta);
      }, err=>{
        console.log(err);
      });

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  addToCart(prd){
    document.getElementById('addBtnId_'+prd.productId).style.display = "none";
    document.getElementById('qtyBtnId_'+prd.productId).style.display = "block";
    this.cart.addcart(prd,'','');
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(prd.productId);
    document.getElementById('prdQty_'+prd.productId).innerHTML = this.thsQty;
    this.isCartVal = true;
  }

  goNextPage(val){
  	this.navCtrl.push(ProductdetailsPage,{itemName:val.productName, itemId:val.productId});
  }
  goCartPage(){
    this.navCtrl.push(MycartPage);
  }

  plusQty(itm){
    this.cart.plusqnty(itm);
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(itm.productId);
    document.getElementById('prdQty_'+itm.productId).innerHTML = this.thsQty;
  }

  minusQty(itm){
    this.cart.minusqntyfrmprod(itm);
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(itm.productId);
    if (this.thsQty > 0) {
      document.getElementById('prdQty_'+itm.productId).innerHTML = this.thsQty;
    } else {
      document.getElementById('addBtnId_'+itm.productId).style.display = "block";
      document.getElementById('qtyBtnId_'+itm.productId).style.display = "none";
    }


    this.crtItmCnt = this.cart.getItemCount();
    if (this.crtItmCnt > 0) {
      this.isCartVal = true;
    } else {
      this.isCartVal = false;
    }
    
  }


  addCustomize(itm){
    if (itm.prdVarint) {
      this.openVariationList(itm);
    } else {
      this.localApi.setSelectItem(itm);
      this.navCtrl.push(ItemselectionPage);
    }
  }


  openVariationList(itm) {
    //console.log(itm.variantList);
    var list = [];
    for(let k = 0; k < itm.variantList.length; k++ ){
      // console.log(k);
      var btnfrmt = {
          text: itm.variantList[k].variantName+' - '+this.appSetng.currency+itm.variantList[k].variantPrice,
          handler: () => {
            //console.log(itm.variantList[k]);
            this.setVariation(itm.variantList[k],itm);
          }
        };

      list.push(btnfrmt);

    }
    //console.log(list);
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select a variation',
      buttons: list
    });
    actionSheet.present();
  }

  setVariation(variation,itm){
    if (itm.hasSelection) {
      this.localApi.setItemVariation(variation);
      this.localApi.setSelectItem(itm);
      this.navCtrl.push(ItemselectionPage);
    } else {
      this.cart.addcart(itm,variation,'');
      this.crtTotal = this.cart.getcarttotal();
      this.crtItmCnt = this.cart.getItemCount();
      this.thsQty = this.cart.getSingleQty(itm.productId);
      this.isCartVal = true; 
    }
  }


  addtoFav(prdid,index){
  if (this.allMyFav.length == 0) {
   this.allMyFav.push(prdid);
   this.prdAta[index].fav = 'heart';
   this.serviceApi.openToast('Item added to your favorite list!',2000,'center');
  } else {
    var temp, position;
      for(let i in this.allMyFav){
          if(this.allMyFav[i]==prdid){
          temp = true;
          position = i;
          break;
        } else {
        temp = false;
        }
      }
      if(temp == false){
        this.allMyFav.push(prdid);
        this.prdAta[index].fav = 'heart';
       this.serviceApi.openToast('Item added to your favorite list!',2000,'center');
      }
      else{
        this.prdAta[index].fav = 'heart-outline';
        this.allMyFav.splice(position, 1);
        this.serviceApi.openToast('Item removed from your favorite list!',2000,'center');
      }
  } 
  this.localApi.setFavorite(this.allMyFav);

}



}
