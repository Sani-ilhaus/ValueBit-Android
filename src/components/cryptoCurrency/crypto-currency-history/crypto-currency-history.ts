import { Component , ViewChild} from '@angular/core';
import { ViewController, NavParams ,Slides} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CryptocurrencyProvider } from '../../../providers/cryptocurrency/cryptocurrency';
import { PnkHttpService } from '../../../providers/pnkutils/pnk-http.service';
import { AppUtils } from '../../../providers/apputils/apputils';


/**
 * Generated class for the CryptoCurrencyHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-currency-history',
  templateUrl: 'crypto-currency-history.html'
})
export class CryptoCurrencyHistoryComponent {
  @ViewChild('slider')  slider:Slides;
  sellcurrency: any;
  buycur: any;
  transactionHistoryDatabuy: { "trans_id": string; "amount": string; "tx_ref": string; "tx_type": string; "tx_fees": string; "error": string; }[];
  myhistorydata: any;
  historyData = "0";
  private todo: FormGroup;
  transactionHistoryData: any;
  currency: string;
  currencysend: any;
  buycurrency: any;
  selectedCurrencyData: any;
  
  constructor(private formBuilder: FormBuilder, public viewCtrl: ViewController, private crytoService: CryptocurrencyProvider, private params: NavParams, private pnkServiceHist: PnkHttpService, private appUtilsHist:AppUtils) {

    this.todo = this.formBuilder.group({
      depositAmount: [''],
      frombankName: [''],
      frombankAccount: [''],
      bankRefNo: [''],
      description: [''],
      accToDepositIn: [''],
      transPass: [''],
    });
  }
  ngOnInit() {
    //alert("ParamSting::"+JSON.stringify(this.params.get('currency'),null,4));
    this.selectedCurrencyData = this.params.get('currency');
    this.crytoService.CryptoHistory(this.selectedCurrencyData.curr_code).then((data1) => {
      this.myhistorydata = this.crytoService.CryptoHistoryList;
      console.log("HistoryData::" + JSON.stringify(this.myhistorydata, null, 4))
    },
      (error) => {
        alert(error);
      })
  }

  logForm() {
    console.log(this.todo.value)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  SelectedTab(ind){
    this.slider.slideTo(ind);
  }
  moveButton($event){
    this.historyData = $event._snapIndex.toString();
  }
  // changestring(value){
  //   alert("kamal");
  //   if(value == 'buy'){
  //       this.historyData = 'buy';
  //   }
  // }
}
