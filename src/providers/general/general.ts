import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PnkHttpService } from '../pnkutils/pnk-http.service';
import { ToastController, ModalController, NavParams } from 'ionic-angular';
import { AppUtils } from '../apputils/apputils';
/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {

    liveData: any = [];
    countryData: any = [];
    country: any = 'INR';
    // countrylink = 'http://valuebit.lokhittrust.in/public/images/flags/';
    countrylink: string;
    cryptocurrencylist: any;
    succussres: any;
    toastMsg: any = '';
    toastDesignClass: any;
    toastTimeOut: any = 3000;
    disableForm = false;
    SelectedCountry: any;
    constructor(public http: HttpClient, public pnkHttpService: PnkHttpService, public toastCtrl: ToastController, private appUtils: AppUtils) {
        this.countrylink = this.appUtils.GetServerUrl() + 'public/images/flags/';
    }
    SaveContactUs() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServer("contact-us", '').subscribe(response => {
                if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                    if (response.enquirystatus.value == 'SUCCESS') {
                        this.succussres = response.enquirystatus.success_message;
                        resolve(response.enquirystatus.success_message);

                    }
                    else {
                        reject(response.enquirystatus.FailureReason.value);
                    }
                }
                else {
                    {
                        this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }
                console.log("into provider resoponse");

            });
        });
    }
    toast() {
        let toast = this.toastCtrl.create({
            message: this.toastMsg,
            duration: this.toastTimeOut,
            dismissOnPageChange: true,
            cssClass: this.toastDesignClass,
            position: 'top'
        });
        setTimeout(() => {
            this.disableForm = false;
            this.toastMsg = '';
            this.toastDesignClass = '';
        }, this.toastTimeOut);
        toast.present();
    }


    LiveCurrencyValue(currencies) {
        return new Promise((resolve, reject) => {
            let endpoint = 'live';
            let access_key = '91efc2b4be3e52a88e930a3965007e48';
            // this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH,DOGE&tsyms=' + this.country).subscribe(data => {
            this.http.get('http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + currencies).subscribe((data: any) => {
                resolve(data.quotes);
            }, (error) => {
                reject(error);
            })
        });

    }

    getCountryData() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("countrydata", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.countrydata.rows.length > 0) {
                            this.countryData = response.countrydata.rows;
                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }
}