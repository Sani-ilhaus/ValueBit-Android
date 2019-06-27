import { Component, Inject, forwardRef } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FiatCurrencyPage } from "../fiat-currency/fiat-currency";
import { CryptoCurrencyPage } from "../crypto-currency/crypto-currency";
import { WalletPage } from "../wallet/wallet";
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { GeneralProvider } from "../../providers/general/general";
import { CryptocurrencyProvider } from '../../providers/cryptocurrency/cryptocurrency';
import { AppUtils } from '../../providers/apputils/apputils';
import { CurrencyaddressPage } from '../currencyaddress/currencyaddress';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    tabFiatCurrencyPage = FiatCurrencyPage;
    tabCryptoCurrencyPage = CryptoCurrencyPage;
    wallet = CurrencyaddressPage;
    // wallet = WalletPage;
    countryData: any = [];
    selectedCountryId: any;
    selectedCountryFiat: any;
    selectedCountryName: any;
    selectedCountryFlag: any;

    constructor(@Inject(forwardRef(() => AuthenticateProvider)) public auth: AuthenticateProvider,
        public general: GeneralProvider, public navCtrl: NavController, public navParams: NavParams,
        public alertCtrl: AlertController, private cryptoService:CryptocurrencyProvider, private appUtils:AppUtils) {

    }

    ngOnInit() {        
        this.getCountryData();  
       // this.GetCurrencyData();      
    }

    ionViewWillEnter() {
       this.checkTwoSF();
    }

    checkTwoSF() {
       // alert("into two step verification");
        if (this.auth.twoFactorStatus == 0) {
            setTimeout(() => {
                if(!this.appUtils.TwoFACheckStatus){
                    this.auth.modalData = '2-Step Verification is Disabled';
                    this.auth.modal();
                }                
            }, 1500);
        }
    }
    
    GetCurrencyData(){
        this.cryptoService.GetCryptoCurrencies().then((res)=>{
           // this.cryptoCurrencies = this.cryptoService.CryptoCurrencies;
            //console.log(this.cryptoCurrencies);
            //this.getCountryData();  
          },
        (error)=>{
          alert("GetCryptoError::"+error);
        })
    }

    getCountryData() {
       /* this.general.getCountryData().then(() => {
            this.countryData = this.general.countryData;
            this.general.SelectedCountry = this.general.countryData[7];

            this.selectedCountryId = this.countryData[0].country_id;
            this.selectedCountryFiat = this.countryData[0].country_fiat;
            this.selectedCountryName = this.countryData[0].country_name;
            this.selectedCountryFlag = this.countryData[0].country_flag;
           // this.GetCurrencyData();
        })*/
    }

    showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Select Country');

        for (let i = 0; i < this.countryData.length; i++) {
            if (this.selectedCountryName == this.countryData[i].country_name) {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_name,
                    value: this.countryData[i].country_name,
                    checked: true
                });
                // this.selectedCountryFlag = this.countryData[i].country_flag;
            } else {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_name,
                    value: this.countryData[i].country_name,
                    /*checked: true*/
                });
                // this.selectedCountryFlag = this.countryData[i].country_flag;
                // console.log(this.selectedCountryFlag);
            }
        }

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.selectedCountryName = data;
                for (let value in this.countryData) {
                    if (data == this.countryData[value].country_name) {
                        this.general.country = this.countryData[value].country_fiat;
                        this.selectedCountryFlag = this.countryData[value].country_flag;
                        break;
                    }
                }
                console.log("SelectedCountry:::"+this.general.country);
            }
        });
        alert.present();
    }

    ionViewDidLoad() {

    }
}
