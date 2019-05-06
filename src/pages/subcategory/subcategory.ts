import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ActionSheetController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { LocalProvider } from '../../providers/local/local';
import { CartProvider } from '../../providers/cart/cart';

import { SubsubcategoryPage } from '../subsubcategory/subsubcategory';
import { ProductsPage } from '../products/products';
import { MycartPage } from '../mycart/mycart';
import { ItemselectionPage } from '../itemselection/itemselection';
/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {
catData : any;
imgPath : any;
appSetng : any;
sldBranch : any;
catName : any;
catId : any;
prdAta : any;
isCartVal : any;
mycart : any;
crtTotal : any;
crtItmCnt : any;
thsQty : any;
public allMyFav = [];
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
  	this.catName = this.navParams.get('catgegoryName');
  	this.catId = this.navParams.get('catId');

  	this.imgPath = localApi.getImgPath();
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
    this.serviceApi.getSubcategory(this.catId).subscribe(data => {
      this.catData = data;
        this.serviceApi.loadingClose();
      }, err=>{
        console.log(err);
      });

    this.serviceApi.getAllProducts(this.catId,'','','','').subscribe(data => {
      this.prdAta = data;
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
      }, err=>{
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  goNextPage(val){
  	if (val.subcategory=='YES') {
  		this.navCtrl.push(SubsubcategoryPage,{catgegoryName:val.categoryName, catId:val.categoryId});
  	} else {
  		this.navCtrl.push(ProductsPage,{catgegoryName:val.categoryName, subCatId:val.categoryId, subSubCatId:'',catId:''})
  	}
  }




  addToCart(prd){
    document.getElementById('addBtnIdsb_'+prd.productId).style.display = "none";
    document.getElementById('qtyBtnIdsb_'+prd.productId).style.display = "block";
    this.cart.addcart(prd,'','');
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(prd.productId);
    document.getElementById('prdQtysb_'+prd.productId).innerHTML = this.thsQty;
    this.isCartVal = true;
  }
  goCartPage(){
    this.navCtrl.push(MycartPage);
  }

  plusQty(itm){
    this.cart.plusqnty(itm);
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(itm.productId);
    document.getElementById('prdQtysb_'+itm.productId).innerHTML = this.thsQty;
  }

  minusQty(itm){
    this.cart.minusqntyfrmprod(itm);
    this.crtTotal = this.cart.getcarttotal();
    this.crtItmCnt = this.cart.getItemCount();
    this.thsQty = this.cart.getSingleQty(itm.productId);
    if (this.thsQty > 0) {
      document.getElementById('prdQtysb_'+itm.productId).innerHTML = this.thsQty;
    } else {
      document.getElementById('addBtnIdsb_'+itm.productId).style.display = "block";
      document.getElementById('qtyBtnIdsb_'+itm.productId).style.display = "none";
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
