import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
//import { Geolocation } from '@ionic-native/geolocation';
//import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { LocalProvider } from '../local/local';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceProvider {
baseURL : string;
imageURL : string;
lat : number;
lng : number;
loader : any;
sldBranch : any = {};
  constructor(public api: ApiProvider,
              public localApi:LocalProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private toast: Toast,
              public http: Http
              ) {
    this.baseURL = "http://donsgiovannis.com/apis/";
    this.imageURL = "http://donsgiovannis.com/uploads/";

    
    // this.geolocation.getCurrentPosition().then((resp) => {
    //  this.lat = resp.coords.latitude
    //  this.lng = resp.coords.longitude
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //  // data can be a set of coordinates, or an error (if an error occurred).
    //  // data.coords.latitude
    //  // data.coords.longitude
    // });
  }

  openToast(message,optm,postiton){
    this.toast.show(message, optm, postiton).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  loadingOpen(val) {
    this.loader = this.loadingCtrl.create({
      content: val
    });
    this.loader.present();
  }

  openAlerts(head,desc,btnname){
    let alert = this.alertCtrl.create({
      title: head,
      subTitle: desc,
      buttons: [btnname]
    });
    alert.present();
  }
  loadingClose() {
    this.loader.dismiss();
  }

  generateRandomNumber() {
    let x = 9; // can be any number
    let randomNumber = Math.floor(Math.random()*x) + 1;

    return this._startTime()+randomNumber;
  }

  _startTime(){
    let today = new Date();
    let m = today.getMinutes();
    let s = today.getSeconds();
    return [ m, s ].join('')
  }

  //--------------------------------------------------------------------------------------------------

  // showToast(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 2000,
  //   });

  //   toast.present(toast);
  // }
  //--------------------------------------------------------------------------------------------------

  getlogin(data) {
    console.log(data);
    return this.api.post('getLogin.php',data);
  }
  getsignup(data) {
    return this.api.post('registrationProcess.php',data);
  }
  getBanner(){
    return this.api.get('getContent.php?getBanners=ok');
  }

  getAppSettings(){
    return this.api.get('getContent.php?getAppSettings=ok');
  }
  getHomeCategory(val){
    return this.api.get('getContent.php?getHomeCategories=ok&branchId='+val+'&branchType='+this.sldBranch.branchType);
  }
  getAllCategory(){
    this.sldBranch = this.localApi.getMyBranch();
    return this.api.get('getContent.php?getAllCategory=ok&branchId='+this.sldBranch.branchId+'&branchType='+this.sldBranch.branchType);
  }

  getAllEvent(){
    this.sldBranch = this.localApi.getMyBranch();
    return this.api.get('getContent.php?getAllEvent=ok');
  }
  getAllBranches(myLat,myLong){
    return this.api.get('getContent.php?getAllBranches=ok&myLat='+myLat+'&myLong='+myLong);
  }
  getSubcategory(catId){
    this.sldBranch = this.localApi.getMyBranch();
    return this.api.get('getContent.php?getSubcategory=ok&branchId='+this.sldBranch.branchId+'&catId='+catId);
  }
  getSubSubcategory(catId){
    this.sldBranch = this.localApi.getMyBranch();
    return this.api.get('getContent.php?getSubSubcategory=ok&branchId='+this.sldBranch.branchId+'&catId='+catId);
  }
  getAllProducts(catId, subCatId,subSubCatId,listtype,favlist){
    this.sldBranch = this.localApi.getMyBranch();
    //alert('CatID:'+catId+' / subCatId:'+subCatId+' / subSubCatId:'+subSubCatId);

    return this.api.get('getContent.php?getAllProducts=ok&branchId='+this.sldBranch.branchId+'&catId='+catId+'&subCatId='+subCatId+'&subSubCatId='+subSubCatId+'&branchType='+this.sldBranch.branchType+'&listtype='+listtype+'&favlist='+favlist);
  }
  checkNumberForReg(val){
    return this.api.get('getContent.php?checkNumberForReg=ok&mobile='+val);
  }
  getMyAddress(userId){
    return this.api.get('getContent.php?getMyAddress=ok&userId='+userId);
  }
  saveMyAddress(data){
   return this.api.post('addaddress.php',data);
  }
  deleteMyAddress(addressid){
    return this.api.get('getContent.php?deleteMyAddress=ok&addressid='+addressid);
  }
  getThisAddress(adrsId){
     return this.api.get('getContent.php?getThisAddress=ok&adrsId='+adrsId);
  }
  updateAddress(data){
    return this.api.post('updateMyAddress.php',data);
  }
  checkDiscountCode(code,totalCartPrice,userid){
    return this.api.get('getContent.php?checkCouponCode=ok&code='+code+'&totalCartPrice='+totalCartPrice+'&userid='+userid);
  }
  checkDelAddress(userPostPostcode, branchPostcode){
    return this.api.get('getContent.php?checkDelAddress=ok&userPostPostcode='+userPostPostcode+'&branchPostcode='+branchPostcode);
  }
  getAllOffers(userid){
    return this.api.get('getContent.php?getAllOffers=ok&userid='+userid);
  }
  getCateringDesc(){
    return this.api.get('getContent.php?getCateringDesc=ok');
  }
  cateringEnq(data){
    return this.api.post('cateringEnq.php',data);
  }
  getAllReviews(){
    return this.api.get('getContent.php?getAllReviews=ok');
  }
  gettableBooingDesc(){
    return this.api.get('getContent.php?gettableBooingDesc=ok');
  }
  tablebookingSend(data){
    return this.api.post('tablebooking.php',data);
  }
  getAboutDesc(){
    return this.api.get('getContent.php?getAboutDesc=ok');
  }
  getPaymentDesc(){
    return this.api.get('getContent.php?getPaymentDesc=ok');
  }
  getDelivInfo(){
    return this.api.get('getContent.php?getDelivInfo=ok');
  }
  getTerms(){
    return this.api.get('getContent.php?getTerms=ok');
  }
  orderPlace(data){
    return this.api.post('placeorder.php',data);
  }
  getMyOrders(userid){
    return this.api.get('getContent.php?getMyOrders=ok&userid='+userid);
  }
  getOrderDetails(val){
    return this.api.get('getContent.php?getOrderDetails=ok&ordernumber='+val);
  }
  updateProfile(data){
    return this.api.post('updateprofile.php',data);
  }
  
  getContactDetails(){
    return this.api.get('getContent.php?getContactDetails=ok');
  }
  getDeveloperDetails(){
    return this.api.get('getContent.php?getDeveloperDetails=ok');
  }
  setDeviceToken(token){
    return this.api.get('getContent.php?setDeviceToken=ok&token='+token);
  }
  gettablebooking(userid){
    return this.api.get('getContent.php?gettablebooking=ok&userid='+userid);
  }
  stripepayment(data){
    return this.api.post('paymentgetways.php',data);
  }
  savereviews(data){
    return this.api.post('setreviews.php',data);
  }
  paynimoPayment(payedAmount,cardholder,cardnumber,expirydate,cvv){
    return this.api.get('paynimo/techprocess.php?payedAmount='+payedAmount+"&cardholder="+cardholder+"&cardnumber="+cardnumber+"&expirydate="+expirydate+"&cvv="+cvv);
  }
}
