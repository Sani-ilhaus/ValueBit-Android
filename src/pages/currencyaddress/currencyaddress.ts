import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AppUtils } from '../../providers/apputils/apputils';
import { CryptocurrencyProvider } from '../../providers/cryptocurrency/cryptocurrency';
import { CopycurrencyaddressmodalComponent } from '../../components/copycurrencyaddressmodal/copycurrencyaddressmodal';
import { CurrencytradegraphComponent } from '../../components/currencytradegraph/currencytradegraph';

/**
 * Generated class for the CurrencyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currencyaddress',
  templateUrl: 'currencyaddress.html',
})
export class CurrencyaddressPage {

  cryptocurrencylist: any = [];
  constructor(public auth: AuthenticateProvider, public navCtrl: NavController, public navParams: NavParams, public general: GeneralProvider, private cryptoService: CryptocurrencyProvider, private appUtils: AppUtils, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.appUtils.ShowLoader();
    this.cryptoService.GetCryptoCurrencyWallets().then((res) => {
      this.cryptoService.GetCurrencyAddress().then(() => {
        this.appUtils.HideLoader();
        this.cryptocurrencylist = this.cryptoService.CryptoCurrencies;
        console.log(this.cryptocurrencylist);
      }, (error) => {
        this.appUtils.HideLoader();
        console.log(error);
      });
    }, (error) => {
      this.appUtils.HideLoader();
      this.appUtils.ShowToast(error, 'bottom', 6000);
    });

  }
  GetCryptoAddresses(refresher) {
    //this.cryptoService.GetCryptoCurrencyWallets().then((res) => {
    this.cryptoService.GetCurrencyAddress().then(() => {
      this.cryptocurrencylist = this.cryptoService.CryptoCurrencies;
      console.log(this.cryptocurrencylist);
      if (refresher != 0)
        refresher.complete();
    }, (error) => {
      console.log(error);
      if (refresher != 0)
        refresher.complete();
      this.appUtils.ShowToast(error, 'bottom', 6000);
    });
    // }, (error) => {
    //   if (refresher != 0)
    //     refresher.complete();
    //   this.appUtils.ShowToast(error, top, 6000);
    // });
  }
  CreateAddress(currency) {
    this.appUtils.ShowLoader();
    this.cryptoService.CreateCurrencyAddress(currency.curr_code).then((res) => {
      this.appUtils.HideLoader();
      currency.curr_addr = res;
    }, (error) => {
      this.appUtils.HideLoader();
      this.appUtils.ShowToast(error, "bottom", 6000);
    });
  }
  ShowAddress(currency) {
    let CurrencyAddressModal = this.modalCtrl.create(CopycurrencyaddressmodalComponent, {
      modalData: currency
    });
    CurrencyAddressModal.present();
  }
  ShowCurrencyGraph(currency) {
    let CurrencyGraphModal = this.modalCtrl.create(CurrencytradegraphComponent, {
      modalData: currency
    });
    CurrencyGraphModal.present();
    // this.navCtrl.push(CurrencytradegraphComponent, {modalData:currency})
  }
}
