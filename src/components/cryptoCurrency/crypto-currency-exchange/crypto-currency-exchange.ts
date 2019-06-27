import { Component, Input } from '@angular/core';
import { Events, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CryptocurrencyProvider } from '../../../providers/cryptocurrency/cryptocurrency';
import { GeneralProvider } from '../../../providers/general/general';
import { AuthenticateProvider } from '../../../providers/authenticate/authenticate';
import { AppUtils } from '../../../providers/apputils/apputils';

/**
 * Generated class for the CryptoCurrencyBuyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-currency-exchange',
  templateUrl: 'crypto-currency-exchange.html'
})
export class CryptoCurrencyExchangeComponent {

  formActive: boolean = true;
  twoStepActive: boolean = false;
  private currencyExchangeForm: FormGroup;
  sendTo: any;
  called = false;
  selectedCoin: any;
  currentPrice: number;
  exchangeData: any;
  @Input() currency;
  constructor(public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController, public cryptoService: CryptocurrencyProvider, private params: NavParams, private general: GeneralProvider, private auth: AuthenticateProvider, private appUtils: AppUtils) {
    this.sendTo = 'CryptoCurrencyBuyComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'CryptoCurrencyBuyComponent') {
        this.submitDataOnSuccess();
      }
    });
    this.exchangeData = {
      ddlToExchangeCurrency: "",
      txtCurrencyExchangeAmountCrypto: 0,
      txtCurrencyExchangeAmount: 0,
      txtFinalAmountForExchange: 0,
      txtFinalCommisionForExchange: 0,
      txtFinalExchangeAmountToConvertedCurrency: 0,
      txtToExchangeAddress: '',
      txtCurrencyExchangeTxs: '',
    }
    this.currencyExchangeForm = this.formBuilder.group({
      txtExchangeTo: ['', Validators.required],
      txtAmount: [0, Validators.required],
    });
  }

  ngOnInit() {
    if (this.currency) {
      this.selectedCoin = this.currency;
    }
    else
      this.selectedCoin = this.params.get('currency');
    console.log("SelectedCoin::" + JSON.stringify(this.selectedCoin, null, 4));
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
    // let feeAmount = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) / 100;
    // let toconvertedexchangeamounttal = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) + feeAmount;
    // let totalInShatoshi = this.currencyBuyForm.value.txtCurrencyBuyAmountNew * Math.pow(10, 8);

    let data = { service_type: 'exchange', amount_in_shatoshi: this.currencyExchangeForm.value.txtAmount * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, from_currency: this.selectedCoin.curr_code, exchange_with_currency: this.currencyExchangeForm.value.txtExchangeTo.trim() };
    //let data = { service_type: 'exchange', amount: this.currencyExchangeForm.value.txtAmount * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, fromCurrency: 'BCY', exchangeWith: 'BCY' };

    //console.log("ChangeData" + JSON.stringify(data, null, 4));
    if (this.currencyExchangeForm.value.txtExchangeTo != '' && this.currencyExchangeForm.value.txtAmount > 0) {
      this.cryptoService.CurrencyConversion(data).then((res: any) => {
        console.log("Conversion:" + JSON.stringify(res));

        this.exchangeData.ddlToExchangeCurrency = this.currencyExchangeForm.value.txtExchangeTo.trim();
        this.exchangeData.txtCurrencyExchangeAmountCrypto = this.currencyExchangeForm.value.txtAmount;
        this.exchangeData.txtCurrencyExchangeAmount = data.amount_in_shatoshi;
        this.exchangeData.txtFinalAmountForExchange = res.convertedexchangeamount.value;
        this.exchangeData.txtFinalCommisionForExchange = res.servicecommision.value;
        this.exchangeData.txtFinalExchangeAmountToConvertedCurrency = res.finalamount.value;

        console.log("Exchange Data:" + JSON.stringify(this.exchangeData));
      }, (error) => {
        this.appUtils.ShowToast(error, 'bottom', 6000);
      });
    }
    else {
      // Exchange currency is not selected or Exchange amount is not mentioned.
    }
  }
  logForm() {
    this.formActive = false;
    this.twoStepActive = true;
    console.log(this.exchangeData)
  }

  submitDataOnSuccess() {
    if (!this.called) {
      this.called = true;
      this.appUtils.ShowLoader();
      this.cryptoService.CryptoExchange(this.exchangeData, this.selectedCoin.curr_code).then((exRes: any) => {
        //alert("SendTo:"+exRes.send_to_address + ", Txs::"+exRes.currencytxs.currencytxs);
        this.exchangeData.txtToExchangeAddress = exRes.send_to_address.value;
        this.exchangeData.txtCurrencyExchangeTxs = JSON.stringify(exRes.currencytxs.transaction_obj);
        this.cryptoService.CryptoExchangeToAddress(this.exchangeData, this.selectedCoin.curr_code).then((exToAddrRes) => {
          this.called = false;
          this.appUtils.HideLoader();
          this.appUtils.ShowToast(exToAddrRes, 'bottom', 6000);
          this.dismiss();
        }, (error) => {
          this.called = false;
          this.appUtils.HideLoader();
          this.appUtils.ShowToast(error, 'bottom', 6000);
        })

      }, (error) => {
        this.called = false;
        this.appUtils.HideLoader();
        this.appUtils.ShowToast(error, 'bottom', 6000);
        console.log(error);
      })
    }
  }

  moveBack() {
    this.formActive = true;
    this.twoStepActive = false;
    this.currencyExchangeForm.reset();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
