import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CryptocurrencyProvider } from '../../providers/cryptocurrency/cryptocurrency';
import { AppUtils } from '../../providers/apputils/apputils';


@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  walletBalance: string = '0.00000000';
  walletBalanceINR: string = '0';
  walletList: any[];
  assetsUrl: string;
  loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cryptoService: CryptocurrencyProvider, private appUtils: AppUtils) {

  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    this.assetsUrl = this.appUtils.GetServerUrl();
    this.loading = true;
    this.cryptoService.GetCryptoCurrencyWallets().then((res) => {
      this.cryptoService.GetCryptoCurrencies().then((res) => {
        this.walletList = this.cryptoService.CryptoCurrencies;
        this.loading = false;
        console.log(JSON.stringify(this.walletList, null, 4));
      },
        (error) => {
          this.loading = false;
          if (error == 'nodata') {

          }
          else {
            this.appUtils.ShowToast(error, top, 6000);
          }
          //alert("GetCryptoError::"+error);
        })
    }, (error) => {
      this.loading = false;
      this.appUtils.ShowToast(error, top, 6000);
    });

  }

}
