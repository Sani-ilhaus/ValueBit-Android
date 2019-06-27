import {Component} from '@angular/core';
import {Events, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {CryptocurrencyProvider} from "../../../providers/cryptocurrency/cryptocurrency";

/**
 * Generated class for the CryptoCurrencySellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-currency-sell',
  templateUrl: 'crypto-currency-sell.html'
})
export class CryptoCurrencySellComponent {

  sendTo: any;
  called = false;
  private todo: FormGroup;
  formActive: boolean = true;
  twoStepActive: boolean = false;

  constructor(public cryptoService: CryptocurrencyProvider, public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController) {
    this.sendTo = 'CryptoCurrencySellComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'CryptoCurrencySellComponent') {
        this.submitDataOnSuccess();
      }
    });

    this.todo = this.formBuilder.group({
      btc: [''],
      transPass: [''],
      payType: [''],
      fee: [''],
      tax: [''],
      total: [''],
    });
  }

  submitDataOnSuccess() {
    if (!this.called) {
      this.called = true;
      this.cryptoService.CryptoSell(this.todo.value).then(() => {
        this.called = false;
      }, (error) => {
        this.called = false;
        console.log(error);
      })
    }
  }


  logForm() {
    this.formActive = false;
    this.twoStepActive = true;
    console.log(this.todo.value)
  }

  moveBack() {
    this.formActive = true;
    this.twoStepActive = false;
    this.todo.reset();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
