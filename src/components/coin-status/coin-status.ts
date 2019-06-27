import { Component } from '@angular/core';
import { GeneralProvider } from "../../providers/general/general";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { CryptocurrencyProvider } from '../../providers/cryptocurrency/cryptocurrency';
import { AppUtils } from '../../providers/apputils/apputils';

/**
 * Generated class for the CoinStatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'coin-status',
    templateUrl: 'coin-status.html'
})
export class CoinStatusComponent {

    liveData: any = [];
    imgLinkPath = 'assets/imgs/cryptoicons/';
    coninStatusInterval: any;

    constructor(public general: GeneralProvider, public auth: AuthenticateProvider, private cryptoService: CryptocurrencyProvider, private appUtils: AppUtils) {

    }

    ngOnInit() {
        // this.auth.spinner();
        // 
        this.general.getCountryData().then(() => {
            //this.countryData = this.general.countryData;
            this.general.SelectedCountry = this.general.countryData[7]; ///Defalut 7th index will be selected for USD, 0th index for INR
            this.cryptoService.CurrencyLivePrice().then((res: any[]) => {
                let countryCurrencies = '';
                for (let i = 0; i < this.general.countryData.length; i++) {
                    // alert(JSON.stringify(this.general.countryData[i]));
                    countryCurrencies += this.general.countryData[i].country_fiat + ',';
                }
                this.general.LiveCurrencyValue(countryCurrencies).then((liveRes: any) => {
                    console.log(typeof liveRes + ", " + JSON.stringify(liveRes, null, 4));
                    //let reqCurr = Object.keys(liveRes);
                    let currPrice = 1;
                    for (var currRate in liveRes) {
                        if (currRate.replace('USD', '') === this.general.SelectedCountry.country_fiat) {
                            currPrice = liveRes[currRate];
                            break;
                        }
                    }
                     res.forEach((element:any) => {
                        element.con_buy_price = (element.buy_price * currPrice).toFixed(2);
                        element.con_sell_price = (element.sell_price * currPrice).toFixed(2);                        
                    });
                    this.liveData = res;
                    console.log("CurrencyLiveData:"+JSON.stringify(this.liveData,null,4));
                }, (error) => {
                    this.liveData = res.forEach(element => {
                        element.con_buy_price = element.buy_price.toFixed(2);
                        element.con_sell_price = element.sell_price.toFixed(2);
                    });
                    this.liveData = res;
                });
            }, (err) => {
                this.appUtils.ShowToast(err, 'bottom', 6000);
            });
        }, (error) => {
            this.appUtils.ShowToast(error, "bottom", 6000);
        });        
    }
    ngOnDestroy() {
        //clearInterval(this.coninStatusInterval);
    }

    convertObjToArray(val) {
        let keys = [];
        for (let key in val) {
            let obj: any = val[key]
            for (let data in obj) {
                let pa: any = Object.keys(obj);
                keys.push({ key, value: obj[Object.keys(obj)[0]] });
            }
        }
        this.liveData = keys;
    }

}
