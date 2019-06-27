import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyaddressPage } from './currencyaddress';

@NgModule({
  declarations: [
    CurrencyaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyaddressPage),
  ],
})
export class CurrencyaddressPageModule {}
