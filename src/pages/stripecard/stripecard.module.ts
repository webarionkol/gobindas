import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StripecardPage } from './stripecard';

@NgModule({
  declarations: [
    StripecardPage,
  ],
  imports: [
    IonicPageModule.forChild(StripecardPage),
  ],
})
export class StripecardPageModule {}
