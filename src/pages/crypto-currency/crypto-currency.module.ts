import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CryptoCurrencyPage } from './crypto-currency';

@NgModule({
  declarations: [
    CryptoCurrencyPage,
  ],
  imports: [
    IonicPageModule.forChild(CryptoCurrencyPage),
  ],
})
export class CryptoCurrencyPageModule {}
