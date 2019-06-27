import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrypagePage } from './entrypage';

@NgModule({
  declarations: [
    EntrypagePage,
  ],
  imports: [
    IonicPageModule.forChild(EntrypagePage),
  ],
})
export class EntrypagePageModule {}
