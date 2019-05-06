import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyacountPage } from './myacount';

@NgModule({
  declarations: [
    MyacountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyacountPage),
  ],
})
export class MyacountPageModule {}
