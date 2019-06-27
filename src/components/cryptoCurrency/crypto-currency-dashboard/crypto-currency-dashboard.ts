import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import { ModalController, NavParams } from 'ionic-angular';

import { CryptoCurrencyBuyComponent } from '../crypto-currency-buy/crypto-currency-buy';
import { CryptoCurrencySellComponent } from '../crypto-currency-sell/crypto-currency-sell';
import { CryptoCurrencySendComponent } from '../crypto-currency-send/crypto-currency-send';
import { CryptoCurrencyHistoryComponent } from '../crypto-currency-history/crypto-currency-history';

import {CryptocurrencyProvider} from '../../../providers/cryptocurrency/cryptocurrency';
import {PnkHttpService} from '../../../providers/pnkutils/pnk-http.service';
import { CryptoCurrencyExchangeComponent } from '../crypto-currency-exchange/crypto-currency-exchange';
import { AppUtils } from '../../../providers/apputils/apputils';
import { CopycurrencyaddressmodalComponent } from '../../copycurrencyaddressmodal/copycurrencyaddressmodal';

@Component({
  selector: 'crypto-currency-dashboard',
  templateUrl: 'crypto-currency-dashboard.html'
})
export class CryptoCurrencyDashboardComponent {

  private cryptoCurrencies:any[];
  constructor(public nav: NavController, public modalCtrl: ModalController, private cryptoService:CryptocurrencyProvider, private pnkServiceDash:PnkHttpService, private appUtilsDash:AppUtils) {

  }
  ngOnInit(){
   // alert("Crypto page");
   // this.cryptoService.GetCryptoCurrencies().then((res)=>{
      this.cryptoCurrencies = this.cryptoService.CryptoCurrencies;
      //console.log(this.cryptoCurrencies);
  //   },
  // (error)=>{
  //   alert("GetCryptoError::"+error);
  // })
  }
  Goto(val, currency) {
    if(val == 'buy') {
     // alert("ParamSting::"+JSON.stringify(currency,null,4));
      //this.nav.push(FiatNavigationPage,{data:'deposit'});
      let profileModal = this.modalCtrl.create(CryptoCurrencyBuyComponent, { currency:currency });
      profileModal.present();
    }else if(val == 'exchange') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(CryptoCurrencyExchangeComponent, { currency:currency });
      profileModal.present();
    }else if(val == 'sell') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(CryptoCurrencySellComponent, { currency:currency });
      profileModal.present();
    }
    else if(val == 'send') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(CryptoCurrencySendComponent, { currency:currency });
      profileModal.present();
    }
    else if(val == 'history') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(CryptoCurrencyHistoryComponent, { currency:currency });
      profileModal.present();
    }
    else if(val == 'receive') {      
      this.ShowAddress(currency);
    }
    //this.fiatPage.fiatWithdraw = true;
  }
  ShowAddress(currency) {
    let CurrencyAddressModal = this.modalCtrl.create(CopycurrencyaddressmodalComponent, {
      modalData: currency
    });
    CurrencyAddressModal.present();
  }
}
