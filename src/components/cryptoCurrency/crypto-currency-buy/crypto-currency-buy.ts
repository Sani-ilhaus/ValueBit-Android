import { Component } from '@angular/core';
import { Events, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CryptocurrencyProvider } from '../../../providers/cryptocurrency/cryptocurrency';
import { GeneralProvider } from '../../../providers/general/general';
import { AuthenticateProvider } from '../../../providers/authenticate/authenticate';

/**
 * Generated class for the CryptoCurrencyBuyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-currency-buy',
  templateUrl: 'crypto-currency-buy.html'
})
export class CryptoCurrencyBuyComponent {

  formActive: boolean = true;
  twoStepActive: boolean = false;
  private currencyBuyForm: FormGroup;
  sendTo: any;
  called = false;
  selectedCoin: any;
  currentPrice: number;

  constructor(public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController, public cryptoService: CryptocurrencyProvider, private params: NavParams, private general: GeneralProvider, private auth:AuthenticateProvider) {
    this.sendTo = 'CryptoCurrencyBuyComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'CryptoCurrencyBuyComponent') {
        this.submitDataOnSuccess();
      }
    });

    this.currencyBuyForm = this.formBuilder.group({
      txtCurrencyBuyAmountNew: [1, Validators.required],
      transPass: [''],
      radPaymentType: ['wallet', Validators.required],
      txtCurrencyBuyFees: [1, Validators.required],
      tax: [''],
      txtCurrencyBuyTotal: [0, Validators.required],
      txtCurrencyBuyAmount: [0, Validators.required],
      txtCurrencyBuyFeesTransaction: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.selectedCoin = this.params.get('currency');
    //alert(this.selectedCoin.curr_code+", ParamSting::" + JSON.stringify(this.general.liveData, null, 4));    
    for (let coin of this.general.liveData) {
      if (this.selectedCoin.curr_code == 'BCY') {
        this.currentPrice = parseFloat(coin['BTC'][this.general.country]);
      }
      else {
        this.currentPrice = parseFloat(coin[this.selectedCoin.curr_code][this.general.country]);
      }

    }
    this.CalculateMoney();
    //   this.crytoService.CryptoHistory(this.params.get('currency').cur_code).then((data)=>{
    //     console.log("HistoryData::"+JSON.stringify(this.crytoService.CryptoHistory,null,4))
    //   },
    // (error)=>{
    //   alert(error);
    // })
  }

  CalculateMoney() {
    //alert("Hlloooo");
    let feeAmount = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) / 100;
    let total = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) + feeAmount;
    let totalInShatoshi = this.currencyBuyForm.value.txtCurrencyBuyAmountNew * Math.pow(10, 8);
    this.currencyBuyForm.patchValue({
      txtCurrencyBuyTotal: total,
      txtCurrencyBuyAmount: totalInShatoshi,
      txtCurrencyBuyFeesTransaction: feeAmount
    });

    // alert(this.currencyBuyForm.value.txtCurrencyBuyTotal+", Hlloooo::"+this.currencyBuyForm.value.txtCurrencyBuyTotal);
  }
  logForm() {
    this.formActive = false;
    this.twoStepActive = true;
    console.log(this.currencyBuyForm.value)
  }

  submitDataOnSuccess() {
    if (!this.called) {
      this.called = true;
      this.auth.spinner();
      this.cryptoService.CryptoBuy(this.currencyBuyForm.value, this.selectedCoin.curr_code).then((res) => {
        this.called = false;
        this.auth.spinnerEnable.dismiss();
        this.auth.toastMsg = res;
        this.auth.toastDesignClass = "success";
        this.auth.toast();
        this.dismiss();
      }, (error) => {
        this.called = false;
        this.auth.spinnerEnable.dismiss();
        this.auth.toastMsg = error;
        this.auth.toastDesignClass = "error";
        this.auth.toast();
        console.log(error);
      })
    }
  }

  moveBack() {
    this.formActive = true;
    this.twoStepActive = false;
    this.currencyBuyForm.reset();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
