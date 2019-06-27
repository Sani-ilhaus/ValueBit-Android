import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiatNavigationPage } from './fiat-navigation';

@NgModule({
  declarations: [
    FiatNavigationPage,
  ],
  imports: [
    IonicPageModule.forChild(FiatNavigationPage),
  ],
})
export class FiatNavigationPageModule {}
