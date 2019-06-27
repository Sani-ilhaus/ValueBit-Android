import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiatCurrencyPage } from './fiat-currency';

@NgModule({
  declarations: [
    FiatCurrencyPage,
  ],
  imports: [
    IonicPageModule.forChild(FiatCurrencyPage),
  ],
})
export class FiatCurrencyPageModule {}
