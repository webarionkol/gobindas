import { Injectable } from '@angular/core';
// import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Injectable()
export class CartProvider {
public locgovindsCartList ;
  constructor(public serviceApi : ServiceProvider) {
    let chkoldcart = JSON.parse(localStorage.getItem('govindsCartList'));
    if(chkoldcart == null){
      localStorage.setItem("govindsCartList", '[]');
    }

    let chkoldFav = JSON.parse(localStorage.getItem('govndsUserFav'));
    if(chkoldFav == null){
      localStorage.setItem("govndsUserFav", '[]');
    }

  }

removeCart(){
  localStorage.setItem("govindsCartList", '[]');
}
  addcart(item,variation,selections){
    console.log(selections);
    var productnames, prodcPrice, prdid, itemtotal, itmOnly;
    if (variation) {
      productnames = item.productName+' - '+variation.variantName;
      prodcPrice = variation.variantPrice;
      itmOnly = variation.variantPrice;
      prdid = item.productId+variation.variantName;
    } else {
      productnames = item.productName;
      prodcPrice = item.productPrice;
      itmOnly = item.productPrice;
      prdid = item.productId;
    }

    if (selections) {
        var selecTTotal = 0.00;
        for(var i=0; i<selections.length; i++){
            var fil = parseFloat(selections[i].selectionPrice);
            selecTTotal += fil;
        }
        var fnSlTotal = selecTTotal.toFixed(2);
        var slcTtl = parseFloat(fnSlTotal);
        var slcTotal = slcTtl.toFixed(2);
        prodcPrice = parseFloat(prodcPrice)+parseFloat(slcTotal);
    }



  	this.locgovindsCartList = JSON.parse(localStorage.getItem('govindsCartList'));
  	if (this.locgovindsCartList.length > 0) {
            let existingCartProduct = [];
            existingCartProduct = this.filterCart(this.locgovindsCartList, item.productId);
            if (existingCartProduct && existingCartProduct.length > 0 && !variation) {

                existingCartProduct[0].qty++;
                let prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
                let totalpriceincr = (prcFloat).toFixed(2);
                existingCartProduct[0].total= totalpriceincr;
                
            } else {
                let totalforitem = parseFloat(prodcPrice);
                let productDetails = [{
                    'name': productnames,
                    'image': item.productImage,
                    'price': prodcPrice,
                    'productId': prdid,
                    'productDesc': item.description,
                    'selections': selections,
                    'productType': item.foodcategory,
                    'qty': 1,
                    'total': totalforitem * 1,
                    'slcTotal': slcTotal,
                    'itemtotal': itmOnly *1,
                    'itmOnly': itmOnly
                }];
                this.locgovindsCartList.push(productDetails[0]);
            }
        } else {
            let totalforitem = parseFloat(prodcPrice);
            let productDetails = [{
                'name': productnames,
                'image': item.productImage,
                'price': prodcPrice,
                'productId': prdid,
                'productDesc': item.description,
                'selections': selections,
                'productType': item.foodcategory,
                'qty': 1,
                'total': totalforitem * 1,
                'slcTotal': slcTotal,
                'itemtotal': itmOnly *1,
                'itmOnly': itmOnly
            }];
            this.locgovindsCartList.push(productDetails[0]);
        }

  	localStorage.setItem('govindsCartList', JSON.stringify(this.locgovindsCartList));
    return this.getcart();
  }

  	getcart(){
  		return JSON.parse(localStorage.getItem("govindsCartList"));
  	}
    getCartCount(){
      var crtCnt = JSON.parse(localStorage.getItem('govindsCartList'));
      return parseFloat(crtCnt.length);
    }

	filterCart(cartProducts, productId) {
	    let returnArray = [];
	    for (let i = 0; i < cartProducts.length; i++) {
	        if (cartProducts[i].productId == productId) {
	            returnArray.push(cartProducts[i]);
	        }
	    }
	    return returnArray;
	}

  minusqnty(item){
    this.locgovindsCartList = JSON.parse(localStorage.getItem('govindsCartList'));
    let existingCartProduct = [];
    existingCartProduct = this.filterCart(this.locgovindsCartList, item.productId);
    if (existingCartProduct[0].qty > 0) {
      existingCartProduct[0].qty--;
      let prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
      let totalpriceincr = (prcFloat).toFixed(2);
      existingCartProduct[0].total= totalpriceincr;

      var itprcFloat = existingCartProduct[0].qty * existingCartProduct[0].itmOnly;
      let ittotalpriceincr = (itprcFloat).toFixed(2);
      existingCartProduct[0].itemtotal= ittotalpriceincr;
    }
    
    localStorage.setItem('govindsCartList', JSON.stringify(this.locgovindsCartList));
    return this.getcart();
  }


   plusqnty(item){
    this.locgovindsCartList = JSON.parse(localStorage.getItem('govindsCartList'));
    let existingCartProduct = [];
    existingCartProduct = this.filterCart(this.locgovindsCartList, item.productId);
      existingCartProduct[0].qty++;
      var prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
      let totalpriceincr = (prcFloat).toFixed(2);
      existingCartProduct[0].total= totalpriceincr;


      var itprcFloat = existingCartProduct[0].qty * existingCartProduct[0].itmOnly;
      let ittotalpriceincr = (itprcFloat).toFixed(2);
      existingCartProduct[0].itemtotal= ittotalpriceincr;
    
    localStorage.setItem('govindsCartList', JSON.stringify(this.locgovindsCartList));
    return this.getcart();
  }



  minusqntyfrmprod(item){
    this.locgovindsCartList = JSON.parse(localStorage.getItem('govindsCartList'));
    let existingCartProduct = [];
    existingCartProduct = this.filterCart(this.locgovindsCartList, item.productId);
    if (existingCartProduct[0].qty > 1) {
      existingCartProduct[0].qty--;
      let prcFloat = existingCartProduct[0].qty * existingCartProduct[0].price;
      let totalpriceincr = (prcFloat).toFixed(2);
      existingCartProduct[0].total= totalpriceincr;


      let itprcFloat = existingCartProduct[0].qty * existingCartProduct[0].itmOnly;
      let ittotalpriceincr = (itprcFloat).toFixed(2);
      existingCartProduct[0].itemtotal= ittotalpriceincr;


    }else{
      for(let i=0; i < this.locgovindsCartList.length; i++){
        if(this.locgovindsCartList[i].productId == item.productId){
          this.deleteProduct(i);
        }
      }
    }
    
    localStorage.setItem('govindsCartList', JSON.stringify(this.locgovindsCartList));
    return this.getcart();
  }

  deleteProduct(index) {
    this.locgovindsCartList = JSON.parse(localStorage.getItem('govindsCartList'));
    (this.locgovindsCartList).splice(index, 1);
    localStorage.setItem('govindsCartList', JSON.stringify(this.locgovindsCartList));
    return this.getcart();
  }

  getSingleQty(itm){
    let cart = this.getcart();
    
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId==itm) {
        return cart[i].qty;
      }
    }
  }

  getcarttotal(){
    let cart = this.getcart();
    let totalprice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalprice += parseFloat(cart[i].total);
    }
    return totalprice.toFixed(2);
  }


  getItemCount(){
    let cart = this.getcart();
    return cart.length;
  }

  
  

}