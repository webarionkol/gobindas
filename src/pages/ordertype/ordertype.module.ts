import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdertypePage } from './ordertype';

@NgModule({
  declarations: [
    OrdertypePage,
  ],
  imports: [
    IonicPageModule.forChild(OrdertypePage),
  ],
})
export class OrdertypePageModule {}
