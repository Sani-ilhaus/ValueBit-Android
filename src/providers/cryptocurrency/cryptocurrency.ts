import { Injectable } from '@angular/core';
import { PnkHttpService } from '../pnkutils/pnk-http.service';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';

/*
  Generated class for the CryptocurrencyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CryptocurrencyProvider {
  public CryptoCurrencies: any[];
  public CryptoHistoryList: any = { sendCurrency: null, buyCurrency: null, sellCurrency: null, receiveCurrency: null, currencyexchange: null };
  constructor(public pnkHttpService: PnkHttpService, private http: Http) {

  }

  CryptoBuy(data, currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("currencybuy/" + currency, data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            console.log("buyData:::" + JSON.stringify(response, null, 4));
            // if (response.cryptocurrencyliststatus.value == "SUCCESS") {
            //   this.CryptoCurrencies = response.cryptocurrencylist.rows;
            // }
            // else {
            //   reject(response.FailureReason.value);
            // }
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
  CryptoExchange(data, currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("currencyexchange/" + currency, data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            console.log("buyData:::" + JSON.stringify(response, null, 4));
            if (response.currencytxs.value == "SUCCESS") {
              resolve(response);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
  CryptoExchangeToAddress(data, currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("currencyexchangetoaddress/" + currency, data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            console.log("ExchangeData:::" + JSON.stringify(response, null, 4));
            if (response.currencyexchange.value == "SUCCESS") {
              if(response.cryptocurrencylist != undefined)
                this.CryptoCurrencies = response.cryptocurrencylist.rows;
            }
            else {
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


  CryptoSell(data) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.GetAjaxFromServer("currencysend/user_name/" + data, '').subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.uniqueuser.value == "SUCCESS") {

            }
            else {
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

  CryptoSend(data, currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("currencysend/" + currency, data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.currencytxs.value == "SUCCESS") {
              resolve(JSON.stringify(response.currencytxs.transaction_obj));
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
  CryptoSendTransactionObj(data, currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("currencysendtoaddress/" + currency, data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.currencysend.value == "SUCCESS") {
              resolve(response.currencysend.success_message);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          // resolve(0);
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
  CryptoHistory(data) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.GetAjaxFromServer("currencyhistory/" + data, '').subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.currencyhistorystatus.value == "SUCCESS") {
              if (response.currencysend)
                this.CryptoHistoryList.sendCurrency = response.currencysend.rows;
              if (response.currencybuy)
                this.CryptoHistoryList.buyCurrency = response.currencybuy.rows;
              if (response.currencysell != undefined)
                this.CryptoHistoryList.sellCurrency = response.currencysell.rows;
              if (response.currencyreceive != undefined)
                this.CryptoHistoryList.receiveCurrency = response.currencyreceive.rows;
              if (response.currencyexchange != undefined)
                this.CryptoHistoryList.currencyexchange = response.currencyexchange.rows;
            }
            else {
              reject(response.FailureReason.value);
            }
            resolve(0);
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }

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
  GetCurrencyAddress() {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.GetAjaxFromServer("getcryptocurrency/wallet/address", '').subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.cryptocurrencyliststatus.value == "SUCCESS") {
              if (response.cryptowalletaddress.rows.length > 0) {
                // this.cryptocurrencylist = response.cryptowalletaddress.rows;
                this.CryptoCurrencies = response.cryptowalletaddress.rows;
              } else {
                reject('no data available');
              }
            }
            else {
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
  GetCryptoCurrencies() {
    return new Promise((resolve, reject) => {
      // this.pnkHttpService.HttpRequestDone = false;
      this.pnkHttpService.GetAjaxFromServer("getcryptocurrency", '').subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.cryptocurrencyliststatus.value == "SUCCESS") {
              if (response.cryptocurrencylist.rows.length > 0) {
                this.CryptoCurrencies = response.cryptocurrencylist.rows;
              }
              else {
                reject('notdata');
              }

            }
            else {
              reject(response.FailureReason.value);
              // this.pnkHttpService.HttpRequestDone = true;
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
            // this.pnkHttpService.HttpRequestDone = true;
          }
          resolve(0);
          // this.pnkHttpService.HttpRequestDone = true;
        }
        else {
          this.pnkHttpService.ParseError();
          reject(1);
          // this.pnkHttpService.HttpRequestDone = true;
        }
      }, error => {
        reject('Unable to Connect To Internet');
        // this.pnkHttpService.HttpRequestDone = true;
      });
    });
  }

  GetCryptoCurrencyWallets() {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.HttpRequestDone = false;
      this.pnkHttpService.GetAjaxFromServer("getcryptocurrency/wallet", '').subscribe(response => {
        if ((response) && (typeof response) != "string") {
          // alert("status::" + response.cryptocurrencyliststatus.value);
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            if (response.cryptowalletbalance.value == "SUCCESS") {
              // console.log("CryptoData:::" + JSON.stringify(response.cryptocurrencylist, null, 4));

              // if (response.cryptocurrencylist.rows.lenght > 0) {
              //   // alert(response.cryptocurrencylist.rows.lenght);
              //   this.CryptoCurrencies = response.cryptocurrencylist.rows;
              // }
              // else {
              //   reject('No data found');
              // }

            }
            else {
              reject(response.FailureReason.value);
              this.pnkHttpService.HttpRequestDone = true;
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
            this.pnkHttpService.HttpRequestDone = true;
          }
          resolve(0);
          this.pnkHttpService.HttpRequestDone = true;
        }
        else {
          this.pnkHttpService.ParseError();
          reject(1);
          this.pnkHttpService.HttpRequestDone = true;
        }
      }, error => {
        reject('Unable to Connect To Internet');
        this.pnkHttpService.HttpRequestDone = true;
      });
    });
  }
  CurrencyConversion(data) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer("gettotalamountdetails", data).subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            // console.log("ConversionData::"+JSON.stringify(response,null,4));
            if (response.amountdetailsstatus.value == "SUCCESS") {
              resolve(response);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
  CreateCurrencyAddress(currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.PostSynchronousAjaxFromServer(currency + "/userscurrency", "").subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            console.log("ConversionData::" + JSON.stringify(response, null, 4));
            if (response.generateaddressstatus.value == "SUCCESS") {
              resolve(response.currencyaddress.value);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
  CurrencyLivePrice() {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.GetAjaxFromServerWithoutAuth("currencyliveprice", "").subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            // console.log("ConversionData::"+JSON.stringify(response,null,4));
            if (response.cryptocurrencyliststatus.value == "SUCCESS") {
              resolve(response.cryptocurrencylist.rows);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
  GetCurrencyConversionList(currency) {
    return new Promise((resolve, reject) => {
      this.pnkHttpService.GetAjaxFromServer("currencyexchangeconversion/"+currency, "").subscribe(response => {
        if ((response) && (typeof response) != "string") {
          if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
            // console.log("ConversionData::"+JSON.stringify(response,null,4));
            if (response.currencyexchangeconversion.value == "SUCCESS") {
              resolve(response.convertedexchangeamount.value);
            }
            else {
              reject(response.FailureReason.value);
            }
          }
          else {
            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
            reject(0);
          }
          //resolve(0);
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
