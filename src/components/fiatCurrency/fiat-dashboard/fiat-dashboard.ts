import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {FiatDepositComponent} from "../fiat-deposit/fiat-deposit";
import {FiatCurrencyPage} from "../../../pages/fiat-currency/fiat-currency";
import { ModalController, NavParams } from 'ionic-angular';
import { FiatWithdrawalComponent } from '../fiat-withdrawal/fiat-withdrawal';
import { FiatNavigationPage } from '../../../pages/fiat-navigation/fiat-navigation';
import {FiatHistoryComponent} from "../fiat-history/fiat-history";


@Component({
  selector: 'fiat-dashboard',
  templateUrl: 'fiat-dashboard.html'
})
export class FiatDashboardComponent {


  constructor(public nav: NavController, public fiatPage: FiatCurrencyPage, public modalCtrl: ModalController) {

  }

  Goto(val) {
    if(val == 'deposit') {
      //this.nav.push(FiatNavigationPage,{data:'deposit'});
      let profileModal = this.modalCtrl.create(FiatDepositComponent, { userId: 8675309 });
      profileModal.present();
    }else if(val == 'withdraw') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(FiatWithdrawalComponent, { userId: 8675309 });
      profileModal.present();
    }else if(val == 'history') {
      //this.nav.push(FiatNavigationPage,{data:'withdraw'});
      let profileModal = this.modalCtrl.create(FiatHistoryComponent, { userId: 8675309 });
      profileModal.present();
    }
    //this.fiatPage.fiatWithdraw = true;
  }
}
