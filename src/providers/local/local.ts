import { Injectable } from '@angular/core';


@Injectable()
export class LocalProvider {

  constructor() {
    console.log('Hello LocalProvider Provider');
  }

  setSelectItem(val){
    localStorage.setItem("govindsChooseItem", JSON.stringify(val));
  }
  getSelectItem(){
    return JSON.parse(localStorage.getItem("govindsChooseItem"));
  }
  removeSelectItem(){
    localStorage.removeItem("govindsChooseItem");
  }



   setItemVariation(val){
    localStorage.setItem("govindsVariation", JSON.stringify(val));
  }
  getItemVariation(){
    return JSON.parse(localStorage.getItem("govindsVariation"));
  }
  removeItemVariation(){
    localStorage.removeItem("govindsVariation");
  }

  setUser(user){
    localStorage.setItem("govindsUser", JSON.stringify(user));
  }
  getUser(){
    return JSON.parse(localStorage.getItem("govindsUser"));
  }
  removeUser(){
    localStorage.removeItem("govindsUser");
  }

  setLanding(){
    localStorage.setItem("landinggovinds", 'OK');
  }
  getLanding(){
    return localStorage.getItem("landinggovinds");
  }

  setTouchId(){
    localStorage.setItem("govindsTouchId", 'OK');
  }
  getTouchId(){
    return localStorage.getItem("govindsTouchId");
  }

  setLogin(){
    localStorage.setItem("govindsLogin", 'OK');
  }
  getLogin(){
    return localStorage.getItem("govindsLogin");
  }
  removeLogin(){
    localStorage.removeItem("govindsLogin");
  }

  setSettings(user){
    localStorage.setItem("govindsAppSettings", JSON.stringify(user));
  }
  getSettings(){
    return JSON.parse(localStorage.getItem("govindsAppSettings"));
  }

  setMyBranch(val){
    localStorage.setItem("govindsUserBranch", JSON.stringify(val));
  }
  getMyBranch(){
    return JSON.parse(localStorage.getItem("govindsUserBranch"));
  }
  removeMyBranch(){
    localStorage.removeItem("govindsUserBranch");
  }

  setFavorite(val){
    localStorage.setItem("govndsUserFav", JSON.stringify(val));
  }
  getFavorite(){
    return JSON.parse(localStorage.getItem("govndsUserFav"));
  }

   getSingleFav(itm){
    let fav = this.getFavorite();
    for (let i = 0; i < fav.length; i++) {
      if (fav[i]==itm) {
        return 'heart';
      }
    }
  }

  getImgPath(){
    return 'http://donsgiovannis.com/uploads/';
  }

  removeAllStoreage(){
    localStorage.removeItem("extraComment");
    localStorage.removeItem("applyedCoupon");
    localStorage.removeItem("orderType");
    localStorage.removeItem("v1DelvertCost");
    localStorage.removeItem("v1SelectedDeveryAddress");
    localStorage.removeItem("v1DelvertCost");
  }

  
}
