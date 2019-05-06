import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaynimoPage } from './paynimo';

@NgModule({
  declarations: [
    PaynimoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaynimoPage),
  ],
})
export class PaynimoPageModule {}
