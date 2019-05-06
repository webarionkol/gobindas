import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymethodPage } from './paymethod';

@NgModule({
  declarations: [
    PaymethodPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymethodPage),
  ],
})
export class PaymethodPageModule {}
