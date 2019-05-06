import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule,RequestOptions,Headers } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
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



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { LocalProvider } from '../providers/local/local';
import { ApiProvider } from '../providers/api/api';
import { ServiceProvider } from '../providers/service/service';
import { CartProvider } from '../providers/cart/cart';
import { PaynimoPage } from '../pages/paynimo/paynimo';
import { EventsPage } from '../pages/events/events';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LandingPage,
    LoginPage,
    CategoryPage,
    MycartPage,
    ProductdetailsPage,
    ProductsPage,
    SubcategoryPage,
    SubsubcategoryPage,
    SignupPage,
    BranchesPage,
    AddaddressPage,
    AddressbookPage,
    OrdertypePage,
    PaymethodPage,
    CheckoutPage,
    EditaddressPage,
    MyacountPage,
    CompleteorderPage,
    OrderlistPage,
    OrderdetailsPage,
    AboutusPage,
    AwardsPage,
    CateringPage,
    DeliveryinformationPage,
    FavouritesPage,
    ImagegalleryPage,
    OffersPage,
    OurteamPage,
    PaymentsinfoPage,
    TablebookingPage,
    TermsPage,
    ReviewsPage,
    ContactusPage,
    DeveloperPage,
    EditprofilePage,
    ChangepasswordPage,
    WalletPage,
    ItemselectionPage,
    StripecardPage,
    ReviewwritePage,
    PaynimoPage,
    EventsPage,
    EventDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LandingPage,
    LoginPage,
    CategoryPage,
    MycartPage,
    ProductdetailsPage,
    ProductsPage,
    SubcategoryPage,
    SubsubcategoryPage,
    SignupPage,
    BranchesPage,
    AddaddressPage,
    AddressbookPage,
    OrdertypePage,
    PaymethodPage,
    CheckoutPage,
    EditaddressPage,
    MyacountPage,
    CompleteorderPage,
    OrderlistPage,
    OrderdetailsPage,
    AboutusPage,
    AwardsPage,
    CateringPage,
    DeliveryinformationPage,
    FavouritesPage,
    ImagegalleryPage,
    OffersPage,
    OurteamPage,
    PaymentsinfoPage,
    TablebookingPage,
    TermsPage,
    ReviewsPage,
    ContactusPage,
    DeveloperPage,
    EditprofilePage,
    ChangepasswordPage,
    WalletPage,
    ItemselectionPage,
    StripecardPage,
    ReviewwritePage,
    PaynimoPage,
    EventsPage,
    EventDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalProvider,
    ApiProvider,
    ServiceProvider,
    CartProvider,
    Geolocation,
    FCM,
    AppRate,
    SocialSharing,
    Device,
    Clipboard,
    InAppBrowser,
    Toast,
    EventsPage,
    EventDetailPage,
    OneSignal
  ]
})
export class AppModule {}
