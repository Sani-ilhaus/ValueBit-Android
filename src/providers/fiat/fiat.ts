import { Injectable } from '@angular/core';
import { PnkHttpService } from '../pnkutils/pnk-http.service';
import { Events } from 'ionic-angular';

/*
  Generated class for the FiatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FiatProvider {
  constructor(public pnkHttpService: PnkHttpService) {

  }

  FiatDeposit(data) {
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

  FiatWithdraw(data) {
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

  FiatHistory(data) {
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

}
