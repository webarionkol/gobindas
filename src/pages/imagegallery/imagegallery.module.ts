import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagegalleryPage } from './imagegallery';

@NgModule({
  declarations: [
    ImagegalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagegalleryPage),
  ],
})
export class ImagegalleryPageModule {}
