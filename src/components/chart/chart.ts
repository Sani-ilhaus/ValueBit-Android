import { Component, Input } from '@angular/core';
import { AppUtils } from '../../providers/apputils/apputils';
import { CryptocurrencyProvider } from '../../providers/cryptocurrency/cryptocurrency';
declare let TradingView:any;
/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  currencyList:any[];

  @Input() currName:string;
  constructor(private appUtils:AppUtils, private cryptoService: CryptocurrencyProvider ) {
    console.log('Hello ChartComponent Component');
    
    setTimeout(() => {
      this.InTradeViewGraph();
    }, 1000);
  }
  ngOnInit() {
    this.cryptoService.GetCurrencyConversionList(this.currName).then((res)=>{
      this.currencyList = [];
      let keys = Object.keys(res);
      for(let key of keys){
        let tmp ={name:key, value:res[key]};
        this.currencyList.push(tmp);
      }
      
    },(error)=>{
      this.appUtils.ShowToast(error, 'bottom',6000);
    })
  }
  InTradeViewGraph() {
    let symbol = 'COINBASE:' + this.currName + 'USD';
    //        fiat_name = localStorage.getItem('country-currency-name');

    new TradingView.widget(
      {
        "width": 980,
        "height": 500,
        "autosize": true,
        "symbol": symbol,
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "Light",
        "style": "1",
        "locale": "in",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "currencyGraphDiv"
      }
    );

  }
}
