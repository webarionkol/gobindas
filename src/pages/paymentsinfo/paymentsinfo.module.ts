import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsinfoPage } from './paymentsinfo';

@NgModule({
  declarations: [
    PaymentsinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsinfoPage),
  ],
})
export class PaymentsinfoPageModule {}
