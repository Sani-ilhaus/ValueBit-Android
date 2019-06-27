import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerComponent } from '../../components/spinner/spinner';

@Injectable()

export class AppUtils {
  public page_title = "";
  public serverUrl: string = "";
  public UrlAfterLogin: string = '';
  public MethodAfterLogin: string = '';
  public AppPrefix: string = 'salahcertified';
  public FcmDeviceId: string;
  public TwoFACheckStatus: boolean = false;
  public SpinnerObj:any;

  constructor(private toastCtrl: ToastController, private sanitizerObj: DomSanitizer, private alertCtrl: AlertController, public modalCtrl: ModalController) { }

  public SetServerUrl(url: string): void {
    this.serverUrl = url;
  }
  public GetServerUrl(): string {
    return this.serverUrl;
  }

  public AddToLocalStorage(key: string, value: any) {
    key = this.AppPrefix + + "_" + key;
    window.localStorage[key] = JSON.stringify(value);
  }
  public GetFromLocalStorage(key: string) {
    key = this.AppPrefix + + "_" + key;
    return JSON.parse(window.localStorage[key] || null);
  }


  public TimeStampDifference(date1: number, date2: number): string {
    let diffTimeStamp: string;
    var difference = date1 / 1000 - date2;

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    diffTimeStamp = 'difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ';
    return diffTimeStamp;
  }
  ShowToast(text, pos, delay) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: delay,
      position: pos
    });
    toast.present();
  }
  SanitizeUrl(url) {
    // alert(url);
    return this.sanitizerObj.bypassSecurityTrustUrl(url);
  }
  CountDownFromDate(countDownDate, intervalObj) { //countDownDate should be in timestamp , IntevalObj will be used to distory the interval object from memory if countdown finished.

    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);



    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(intervalObj);
      return "EXPIRED";
    }
    else {
      // Display the result in the element with id="demo"
      return days + "D " + hours + "H "
        + minutes + "M " + seconds + "S ";
    }
  }
  ShowAlert(title, msg, button, style) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      cssClass: style,
      buttons: [button]
    });
    alert.present();
  }
  ShowLoader() {
    this.SpinnerObj = this.modalCtrl.create(SpinnerComponent);
    this.SpinnerObj.present();
  }
  HideLoader() {
    this.SpinnerObj.dismiss();
  }

}
