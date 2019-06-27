import { Component } from '@angular/core';
import { Events, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CryptocurrencyProvider } from "../../../providers/cryptocurrency/cryptocurrency";
import { GeneralProvider } from '../../../providers/general/general';
import { AuthenticateProvider } from '../../../providers/authenticate/authenticate';
import { AppUtils } from '../../../providers/apputils/apputils';

/**
 * Generated class for the CryptoCurrencySendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-currency-send',
  templateUrl: 'crypto-currency-send.html'
})
export class CryptoCurrencySendComponent {

  private currencySendForm: FormGroup;
  formActive: boolean = true;
  twoStepActive: boolean = false;
  sendTo: any;
  called = false;
  selectedCoin: any;
  currentPrice: number;
  enableBtn:boolean= false;
  constructor(public cryptoService: CryptocurrencyProvider, public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController, private params: NavParams, private general: GeneralProvider, private auth: AuthenticateProvider, private appUtils:AppUtils) {
    this.sendTo = 'CryptoCurrencySendComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'CryptoCurrencySendComponent') {
        this.SendTransactionObj();
      }
    });

    this.currencySendForm = this.formBuilder.group({
      fromBtcAddress: [''],
      txtToCurrencyAddress: [''],
      txtCurrencySendAmountCrypto: [1, Validators.required],
      txtCurrencySendTxs: [''],
      txtCurrencySendAmount: [''],
      txtCurrencySendFees: ['']
    });
  }
  ngOnInit() {
    this.selectedCoin = this.params.get('currency');
    console.log("CurrencyData At Load::"+JSON.stringify(this.selectedCoin, null, 4));
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

  }
  CalculateMoney() {
    if(this.currencySendForm.value.txtToCurrencyAddress != '' && this.currencySendForm.value.txtCurrencySendAmountCrypto > 0){
      this.enableBtn = true;
    }
    else{
      this.enableBtn = false;
    }
    //alert("Hlloooo");
    
    // let feeAmount = (this.currentPrice * this.currencySendForm.value.txtCurrencySendAmountCrypto) / 100;
    // let total = (this.currentPrice * this.currencySendForm.value.txtCurrencySendAmountCrypto) + feeAmount;
    // let totalInShatoshi = this.currencySendForm.value.txtCurrencySendAmountCrypto * Math.pow(10, 8);
    let data = { service_type: 'transfer', amount_in_shatoshi: this.currencySendForm.value.txtCurrencySendAmountCrypto * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, from_currency: this.selectedCoin.curr_code};

    this.cryptoService.CurrencyConversion(data).then((res:any)=>{
      //alert("jljlj:"+JSON.stringify(res, null,4));
      //this.currencySendForm.patchValue({
        // txtCurrencySendTotal: total,
        this.currencySendForm.value.txtCurrencySendAmount = data.amount_in_shatoshi;
        // txtCurrencySendFeesTransaction: feeAmount,
        this.currencySendForm.value.txtFinalAmountForSend = res.finalamount.value,
        this.currencySendForm.value.txtFinalCommisionForSend = res.servicecommision.value
  
     // });
    }, (error)=>{
      this.appUtils.ShowToast(error, 'bottom', 6000);
      console.log("ErrorWhileConversion:"+error);
    })
    

    // alert(this.currencyBuyForm.value.txtCurrencyBuyTotal+", Hlloooo::"+this.currencyBuyForm.value.txtCurrencyBuyTotal);
  }

  SendCurrencyAmount() {
    if (!this.called) {
      this.called = true;
      this.auth.spinner();
      this.cryptoService.CryptoSend(this.currencySendForm.value, this.selectedCoin.curr_code).then((res) => {
        this.ShowTransactionForm()
        this.called = false;
        this.auth.spinnerEnable.dismiss();
        this.currencySendForm.value.txtCurrencySendTxs = res
       // });        
        //this.dismiss();
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


  ShowTransactionForm() {
    this.formActive = false;
    this.twoStepActive = true;
    console.log(this.currencySendForm.value)
  }
  SendTransactionObj() {
    console.log(this.currencySendForm.value)
    if (!this.called) {
      this.called = true;
      this.auth.spinner();
      //alert("FormData::"+JSON.stringify(this.currencySendForm.value,null,4));
      console.log("FormData::"+JSON.stringify(this.currencySendForm.value,null,4));
      this.cryptoService.CryptoSendTransactionObj(this.currencySendForm.value, this.selectedCoin.curr_code).then((res) => {
        this.SendCurrencyAmount()
        this.called = false;
        this.auth.spinnerEnable.dismiss();
        this.auth.toastMsg = res;
        this.auth.toastDesignClass = "success";
        this.auth.toast();
        setTimeout(()=>{
          this.cryptoService.GetCryptoCurrencyWallets().then((res) => {

          });
        },10000)        
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
    this.currencySendForm.reset();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
