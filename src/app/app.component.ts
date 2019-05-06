import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { ServiceProvider } from '../providers/service/service';
import { LocalProvider } from '../providers/local/local';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CategoryPage } from '../pages/category/category';
import { MycartPage } from '../pages/mycart/mycart';
import { ProductdetailsPage } from '../pages/productdetails/productdetails';
import { ProductsPage } from '../pages/products/products';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { SubsubcategoryPage } from '../pages/subsubcategory/subsubcategory';
import { BranchesPage } from '../pages/branches/branches';
import { AddaddressPage } from '../pages/addaddress/addaddress';
import { AddressbookPage } from '../pages/addressbook/addressbook';
import { OrdertypePage } from '../pages/ordertype/ordertype';
import { PaymethodPage } from '../pages/paymethod/paymethod';
import { CheckoutPage } from '../pages/checkout/checkout';
import { EditaddressPage } from '../pages/editaddress/editaddress';
import { MyacountPage } from '../pages/myacount/myacount';
import { CompleteorderPage } from '../pages/completeorder/completeorder';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { OrderdetailsPage } from '../pages/orderdetails/orderdetails';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { AwardsPage } from '../pages/awards/awards';
import { CateringPage } from '../pages/catering/catering';
import { DeliveryinformationPage } from '../pages/deliveryinformation/deliveryinformation';
import { FavouritesPage } from '../pages/favourites/favourites';
import { ImagegalleryPage } from '../pages/imagegallery/imagegallery';
import { OffersPage } from '../pages/offers/offers';
import { OurteamPage } from '../pages/ourteam/ourteam';
import { PaymentsinfoPage } from '../pages/paymentsinfo/paymentsinfo';
import { TablebookingPage } from '../pages/tablebooking/tablebooking';
import { TermsPage } from '../pages/terms/terms';
import { ReviewsPage } from '../pages/reviews/reviews';
import { ContactusPage } from '../pages/contactus/contactus';
import { DeveloperPage } from '../pages/developer/developer';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { WalletPage } from '../pages/wallet/wallet';
import { ItemselectionPage } from '../pages/itemselection/itemselection';
import { StripecardPage } from '../pages/stripecard/stripecard';
import { ReviewwritePage } from '../pages/reviewwrite/reviewwrite';
import { EventsPage } from '../pages/events/events';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: any;
  appsett : any = {};
  subPage : any;
  appSetng : any = {};
  chkLandingPage : any;
  brnch : any;
  pgs : any;
  logedUser : any = {};
  public counter=0;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public serviceApi : ServiceProvider,
              public localApi : LocalProvider,
              private geolocation: Geolocation,
              // private fcm: FCM,
              private oneSignal: OneSignal,
              public actionSheetCtrl: ActionSheetController,
              private appRate: AppRate,
              private socialSharing: SocialSharing,
              private device: Device,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController
              ) {

    this.serviceApi.loadingOpen('Please wait, we are fetching your data...');
    this.serviceApi.getAppSettings().subscribe(data => {
      this.appsett = data[0];
      this.localApi.setSettings(this.appsett);

      this.serviceApi.getAllBranches('','').subscribe(data => {
      this.brnch = data[0];
      this.localApi.setMyBranch(data[0]);
      }, err=>{
        console.log(err);
      });



      this.appSetng = this.localApi.getSettings();
      this.chkLandingPage = this.localApi.getLanding();
      this.logedUser = this.localApi.getUser();
      this.initializeApp();
      this.serviceApi.loadingClose();

      }, err=>{
        console.log(err);
      });

    
    
    //this.appSetng.landingpage
    

    // used for an example of ngFor and navigation
    this.subPage = [
      { title: 'How it works', component: HomePage},
      { title: 'Delivery', component: HomePage},
      { title: 'Return', component: HomePage},
      { title: 'FAQ', component: HomePage},
      { title: 'Regulation', component: HomePage},
      { title: 'About Us', component: HomePage},
    ];


    this.pgs = [
      { title: 'Home', component: HomePage,  icon: "./assets/icon/Home.png"},
      { title: 'Order Menu', component: CategoryPage,  icon: "./assets/icon/Menu.png"},
      { title: 'Offers', component: OffersPage,  icon: "./assets/icon/Offers.png"},
      { title: 'Catering', component: CateringPage,  icon: "./assets/icon/Cataring.png"},
      { title: 'Favourites', component: 'Favourites',  icon: "./assets/icon/Favaurate.png"},
      { title: 'Review / Rating', component: ReviewsPage,  icon: "./assets/icon/Rate.png"},
      { title: 'Table Booking', component: TablebookingPage,  icon: "./assets/icon/Table-booking.png"},
      { title: 'About', component: 'About',  icon: "./assets/icon/About.png"},
      { title: 'My Acount', component: 'My Acount',  icon: "./assets/icon/My-account.png"},
      { title: 'Events', component: EventsPage,  icon: "./assets/icon/Events.png"},
      { title: 'Contact Us', component: ContactusPage,  icon: "./assets/icon/Contact.png"},
      { title: 'More', component: 'More',  icon: "./assets/icon/More.png"},
    ];
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (isCordovaAvailable()){
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.getIds().then(data=>{
          localStorage.setItem("myDeviceToken", data.userId);
        })
        this.oneSignal.endInit();
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        let view = this.nav.getActive();

        if (view.component.name!='BranchesPage') {
          if (view.component.name!='HomePage') {
            this.nav.setRoot(HomePage);
          } else {
            this.nav.setRoot(BranchesPage);
          }
        } else {
          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 1000)
          } else {
            this.platform.exitApp();
          }
        }

        


      }, 100)


      this.geolocation.getCurrentPosition().then((resp) => {
        
        // localStorage.setItem("myLat", resp.coords.latitude);
        // localStorage.setItem("myLong", resp.coords.longitude);
       // resp.coords.latitude
       // resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       //console.log(data);
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
      });



      //this.fcm.subscribeToTopic('marketing');

//START FCM NOTI////
        // this.fcm.getToken().then(token => {
        //   localStorage.setItem("myDeviceToken", token);
        //   //alert(token);
        //   this.serviceApi.setDeviceToken(token).subscribe(data => {
          
        //   }, err=>{
        //     console.log(err);
        //   });
        //   //backend.registerToken(token);
        // });

        // this.fcm.onNotification().subscribe(data => {
        //   if(data.wasTapped){
        //     alert(JSON.stringify(data));
        //     //Notification was received on device tray and tapped by the user.
        //    cccccccccccccccccccccccc

        //   }else{
        //    // alert(JSON.stringify(data));
        //     //Notification was received in foreground. Maybe the user needs to be notified.
        //     if (data.notiFor=='offer') {
        //       this.openAlertNoti(data.heading, data.description, 'offer', '', 'View Offer');
        //     } else if (data.notiFor === 'event') {
        //       this.openAlertNoti(data.heading, data.description, 'event', '', 'View Event');
        //     }

            
        //   }
        // }); 

        
//END FCM NOTI////
        // this.fcm.onNotificationReceived().subscribe(data => {
        //   console.log(data);
        // });

        // this.fcm.onTokenRefresh().subscribe(token => {
        //  // backend.registerToken(token);
        // });



      

    let myLat = localStorage.getItem("myLat");
    let myLong = localStorage.getItem("myLong");

    this.serviceApi.getAllBranches(myLat,myLong).subscribe(data => {
      this.brnch = data[0];
      this.localApi.setMyBranch(data[0]);
      }, err=>{
        console.log(err);
      });

  this.appSetng = this.localApi.getSettings();
  
  this.pages = [];
  for (var i = 0; i < this.pgs.length; i++) {
    if (this.pgs[i].title=='Home') {
      this.pages.push(this.pgs[i]);
    }
    if (this.pgs[i].title=='Order Menu') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.offer=='ON' && this.pgs[i].title=='Offers') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.catering=='ON' && this.pgs[i].title=='Catering') {
      this.pages.push(this.pgs[i]);
    }
    if (this.pgs[i].title=='Favourites') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.reviews=='ON' && this.pgs[i].title=='Review / Rating') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.tablebooking=='ON' && this.pgs[i].title=='Table Booking') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.about=='ON' && this.pgs[i].title=='About') {
      this.pages.push(this.pgs[i]);
    }
    if (this.pgs[i].title=='My Acount') {
      this.pages.push(this.pgs[i]);
    }
    if (this.appSetng.events=='ON' && this.pgs[i].title=='Events') {
      this.pages.push(this.pgs[i]);
    }
    if (this.pgs[i].title=='Contact Us') {
      this.pages.push(this.pgs[i]);
    }
    if (this.pgs[i].title=='More') {
      this.pages.push(this.pgs[i]);
    }
    
    
  }

  //this.pages = this.pgs;
    if (this.appSetng.landingpage=='ON') {
      if (this.chkLandingPage) {
        if (this.appSetng.multiplebranches=='ON') {
          this.rootPage = BranchesPage;
        } else {
          this.rootPage = HomePage;
        }
      } else {
        this.rootPage = LandingPage;

      }
    } else {
        if (this.appSetng.multiplebranches=='ON') {
          this.rootPage = BranchesPage;
        } else {
          this.rootPage = HomePage;
        }
    }



    });
  }


  private onPushReceived(payload: OSNotificationPayload) {

   
    if (payload.additionalData.notiFor=='offer') {
            this.openAlertNoti(payload.additionalData.heading, payload.additionalData.description, 'offer', '', 'View Offer');
          } else if (payload.additionalData.notiFor === 'event') {
            this.openAlertNoti(payload.additionalData.heading, payload.additionalData.description, 'event', '', 'View Event');
      }
      else{
       // alert('Push recevied:' + payload.body);
      }
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
  //  alert(JSON.stringify(payload));
    if (payload.additionalData.notiFor=='offer') {
      this.openAlertNoti(payload.additionalData.heading, payload.additionalData.description, 'offer', '', 'View Offer');
    } else if (payload.additionalData.notiFor === 'event') {
      this.openAlertNoti(payload.additionalData.heading, payload.additionalData.description, 'event', '', 'View Event');
}
else{
  alert('Push recevied:' + payload.body);
}
  }
  openAboutList() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'About',
      buttons: [
        {
          text: 'About Us',
          handler: () => {
            this.nav.push(AboutusPage);
          }
        },{
          text: 'Terms & Conditions',
          handler: () => {
            this.nav.push(TermsPage);
          }
        },{
          text: 'Delivery Information',
          handler: () => {
            this.nav.push(DeliveryinformationPage);
          }
        },{
          text: 'Payments & Refunds',
          handler: () => {
            this.nav.push(PaymentsinfoPage);
          }
        }
      ]
    });
    actionSheet.present();
  }





   openMoreList() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'More',
      buttons: [
        {
          text: 'Share App',
          handler: () => {
            this.shareThisApp();
          }
        },{
          text: 'Rate App',
          handler: () => {
            this.rateThisApp();
          }
        },{
          text: 'About The Developer',
          handler: () => {
            this.nav.push(DeveloperPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

shareThisApp(){
  if (this.device.platform=='Android') {
    this.socialSharing.share('Found this interesting app. Thought of sharing with you as you may find it useful:', null, null, 'https://play.google.com/store/apps/details?id=com.mobileappformyrestaurant.govindas');
  } else {
    this.socialSharing.share('Found this interesting app. Thought of sharing with you as you may find it useful:', null, null, 'https://itunes.apple.com/us/app/v1-restaurant-and-takeaway/id1265598164')
  }
}


rateThisApp(){
  this.appRate.preferences.storeAppURL = {
  ios: 'id1265598164',
  android: 'market://details?id=com.mobileappformyrestaurant.govindas'
};

this.appRate.promptForRating(true);
}

goMyAcntPage(){
  this.logedUser = this.localApi.getUser();
  if (this.logedUser) {
    this.nav.push(MyacountPage);
  } else {
    this.nav.push(LoginPage);
  }
}


openAlertNoti(head,desc,forwh,id,btnname) {
    const confirm = this.alertCtrl.create({
      title: head,
      message: desc,
      buttons: [
        {
          text: btnname,
          handler: () => {
            if (forwh=='offer') {
              this.nav.push(OffersPage);
            } else if (forwh=='event') {
              this.nav.push(EventsPage);
            }
            
          }
        }
      ]
    });
    confirm.present();
  }


presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }



  openPage(page) {
    //console.log(page);
    if(page.title == 'Home'){
      this.nav.setRoot(page.component);
    }else if(page.title=='About'){
      this.openAboutList();
    }else if(page.title=='More'){
      this.openMoreList();
    }else if(page.title=='My Acount'){
      this.goMyAcntPage();
    }  else if(page.title=='Favourites'){
      this.nav.push(ProductsPage,{favourites:'Favourites'});
    } else {
       this.nav.push(page.component);
    }
  }
}
