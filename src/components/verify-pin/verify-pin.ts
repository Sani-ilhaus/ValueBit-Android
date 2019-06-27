import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { HomePage } from '../../pages/home/home';
import { PnkHttpService } from "../../providers/pnkutils/pnk-http.service";

/**
 * Generated class for the VerifyPinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'verify-pin',
    templateUrl: 'verify-pin.html'
})
export class VerifyPinComponent {

    inpComp = false;
    @ViewChild('pin') pin: ElementRef;
    /*@ViewChild('pin1') pin1;
    @ViewChild('pin2') pin2;
    @ViewChild('pin3') pin3;
    @ViewChild('pin4') pin4;
    @ViewChild('pin11') pin11;
    @ViewChild('pin22') pin22;
    @ViewChild('pin33') pin33;
    @ViewChild('pin44') pin44;*/

    actualPin: any = '';
    reverify = false;
    txtAppPin: any = {};

    /*
    userPin: number;
    private verifyPin: FormGroup;
    private reverifyPin: FormGroup;
    formStatus = false;*/

    constructor(private pnkHttpService: PnkHttpService, private home: HomePage, public navCtrl: NavController, private formBuilder: FormBuilder, public auth: AuthenticateProvider) {
        /*
        this.verifyPin = this.formBuilder.group({
            pin1: ['', ''],
            pin2: ['', ''],
            pin3: ['', ''],
            pin4: ['', ''],
        });

        this.reverifyPin = this.formBuilder.group({
            pin11: ['', ''],
            pin22: ['', ''],
            pin33: ['', ''],
            pin44: ['', ''],
        });

        */
    }


    ngOnInit() {
        this.setFocus();
        if (localStorage.getItem('userData') != null) {
           // this.auth.userData = JSON.parse(localStorage.getItem('userData'));
            //this.pnkHttpService.token = JSON.parse(localStorage.getItem('token'));
            if (this.auth.userData != null) {
                this.auth.loggedIn = true;
                this.home.pinVerification = true;
                if (this.auth.userData.userfourdigitpinstatus == 1) {
                    this.auth.userPinSetStatus = true;
                } else {
                    this.auth.userPinSetStatus = false;
                }
            } else {

            }
        }
    }

    ionViewDidLoad() {

        /*if (!this.auth.userPinSetStatus) {
            this.verifyPin.value.pin1 = this.verifyPin.value.pin2 = this.verifyPin.value.pin3 = this.verifyPin.value.pin4 =
                this.reverifyPin.value.pin11 = this.reverifyPin.value.pin22 = this.reverifyPin.value.pin33 = this.reverifyPin.value.pin44 = '';
        } else {
            this.reverifyPin.value.pin11 = this.reverifyPin.value.pin22 = this.reverifyPin.value.pin33 = this.reverifyPin.value.pin44 = '';
        }*/
    }
    getValue($event) {
        if ($event.target.value.length == 4) {
            //when all the entries are done
            this.inpComp = true;
            this.txtAppPin.txtAppPin = $event.target.value;
            if (this.auth.userData.userfourdigitpinstatus == 0) {
                // if setting pin for the first time
                if (!this.reverify) {
                    this.inpComp = false;
                    //re entering the same pin
                    this.reverify = true;
                    this.actualPin = $event.target.value;
                    $event.target.value = '';
                } else {
                    this.inpComp = true;
                    // pin has been entered twice
                    if (this.actualPin == this.txtAppPin.txtAppPin) {
                        this.auth.spinner();
                        // both the pins match offlie before sending the server
                        this.auth.pinSet(this.txtAppPin).then(() => {
                            this.auth.spinnerEnable.dismiss();
                            this.auth.toastDesignClass = 'success';
                            this.auth.toastMsg = 'Pin has been set';
                            this.auth.toast();
                            setTimeout(() => {

                                this.navCtrl.setRoot(DashboardPage);
                               
                            }, this.auth.toastTimeOut);
                        }, (error) => {
                            $event.target.value = '';
                            this.inpComp = false;
                            this.auth.spinnerEnable.dismiss();
                            this.auth.toastDesignClass = 'error';
                            this.auth.toastMsg = 'Unable To set pin. Please Try again';
                            this.auth.toast();
                            this.setFocus();
                        });
                    } else {
                        // both the pins didnot match offlie before sending the server
                        this.inpComp = true;
                        this.auth.toastDesignClass = 'error';
                        this.auth.toastMsg = 'Entered pin did not match!';
                        this.auth.toast();
                        this.setFocus();
                    }
                }
            } else {
                // pin was previously set now verifying from the server
                if (this.txtAppPin != '') {
                    this.auth.spinner();
                    this.auth.pinVerification(this.txtAppPin).then(() => {
                        this.auth.spinnerEnable.dismiss();
                        this.navCtrl.setRoot(DashboardPage);
                    }, (error) => {
                        this.inpComp = false;
                        $event.target.value = '';
                        this.auth.spinnerEnable.dismiss();
                        this.auth.toastDesignClass = 'error';
                        this.auth.toastMsg = error;
                        this.auth.toast();
                        this.setFocus();
                    });
                } else {
                    // entering null for pin verification
                    $event.target.value = '';
                    this.inpComp = false;
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Input value cannot be empty!';
                    this.auth.toast();
                    this.setFocus();
                }
            }
        }
        console.log($event.target.value);

    }

    setFocus() {
        setTimeout(() => {
            this.pin.nativeElement.focus();
        }, 500);
    }

    /*pinVerification() {
        this.auth.spinner();
        if (!this.auth.userPinSetStatus) {
            this.userPin = this.verifyPin.value.pin1 + this.verifyPin.value.pin2 + this.verifyPin.value.pin3 + this.verifyPin.value.pin4;
            let temp = this.reverifyPin.value.pin11 + this.reverifyPin.value.pin22 + this.reverifyPin.value.pin33 + this.reverifyPin.value.pin44;
            if ((this.userPin == temp) && (this.formStatus)) {
                this.txtAppPin.txtAppPin = this.userPin;
                this.auth.pinSet(this.txtAppPin).then(() => {
                    this.auth.spinnerEnable.dismiss();
                    this.auth.toastDesignClass = 'success';
                    this.auth.toastMsg = 'Pin has been set';
                    this.auth.toast();
                    setTimeout(() => {
                        this.navCtrl.setRoot(DashboardPage);
                    }, this.auth.toastTimeOut);
                }, (error) => {
                    this.auth.spinnerEnable.dismiss();
                    this.verifyPin.reset();
                    this.reverifyPin.reset();
                    this.pin1.setFocus();
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Unable To set pin. Please Try again';
                    this.auth.toast();
                });
            } else {
                this.auth.spinnerEnable.dismiss();
                this.reverifyPin.reset();
                this.pin1.setFocus();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = 'Pin did not match!';
                this.auth.toast();
            }
        }
        else {
            let temp = this.reverifyPin.value.pin11 + this.reverifyPin.value.pin22 + this.reverifyPin.value.pin33 + this.reverifyPin.value.pin44;
            this.txtAppPin.txtAppPin = temp;
            if (this.formStatus) {
                this.auth.pinVerification(this.txtAppPin).then(() => {
                    this.auth.spinnerEnable.dismiss();
                    this.navCtrl.setRoot(DashboardPage);
                }, (error) => {
                    this.auth.spinnerEnable.dismiss();
                    this.verifyPin.reset();
                    this.reverifyPin.reset();
                    setTimeout(() => {
                        this.pin11.setFocus();
                    }, 1000);
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Unable to connnect to Internet!';
                    this.auth.toast();
                });
            } else {
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = 'Please Re-Enter pin!';
                this.auth.toast();
            }
        }
    }*/

    /*checkPinFormStatus() {
        if (!this.auth.userPinSetStatus) {
            if ((this.verifyPin.value.pin1 != '') && (this.verifyPin.value.pin2 != '') && (this.verifyPin.value.pin3 != '') && (this.verifyPin.value.pin4 != '')) {
                if ((this.verifyPin.value.pin11 != '') && (this.verifyPin.value.pin22 != '') && (this.verifyPin.value.pin33 != '') && (this.verifyPin.value.pin44 != '')) {
                    this.formStatus = true;
                    setTimeout(() => {
                        this.pinVerification();
                    }, 100);
                }
            } else {
                this.auth.toastDesignClass = 'error';
                this.auth.disableForm = false;
                this.verifyPin.reset();
                this.reverifyPin.reset();
            }
        } else {
            if ((this.verifyPin.value.pin11 != '') && (this.verifyPin.value.pin22 != '') && (this.verifyPin.value.pin33 != '') && (this.verifyPin.value.pin44 != '')) {
                this.formStatus = true;
                setTimeout(() => {
                    this.pinVerification();
                }, 100);
            }
            else {
                this.verifyPin.reset();
                this.reverifyPin.reset();
            }
        }
    }*/

    changeFocus(val, ev) {

        /*if(ev.key == 'Backspace'){
            this.reverifyPin.reset();
            setTimeout(()=>{
                this.pin11.setFocus();                
            },350);
        }else{
            if ((val == 'pin1') && (this.reverifyPin.value.pin1 != '')) {
                this.pin2.setFocus();
            } else if (val == 'pin2') {
                this.pin3.setFocus();
            } else if (val == 'pin3') {
                this.pin4.setFocus();
            } else if (val == 'pin4') {
                this.reverify = true;
                setTimeout(() => {
                    this.pin11.setFocus();
                }, 1000)
            }
        }*/
    }

    rechangeFocus(val, ev) {

        /*if(ev.key == 'Backspace'){
            this.reverifyPin.reset();
            setTimeout(()=>{
                this.pin11.setFocus();                
            },350);
        }else{
            if (val == 'pin11') {
                if(this.reverifyPin.value.pin11 == ''){
                    this.pin11.setFocus();
                }else{
                    this.pin22.setFocus();
                }

            } else if (val == 'pin22') {
                if(this.reverifyPin.value.pin22 == ''){
                    this.pin22.setFocus();
                }else{
                    this.pin33.setFocus();
                }
            } else if (val == 'pin33') {
                if(this.reverifyPin.value.pin33 == ''){
                    this.pin33.setFocus();
                }else{
                    this.pin44.setFocus();
                }
            } else if (val == 'pin44') {
                if(this.reverifyPin.value.pin44 == ''){
                    this.pin44.setFocus();
                }else{
                    this.auth.disableForm = true;
                    if (this.auth.userPinSetStatus) {
                        this.checkPinFormStatus();
                    } else {
                        this.checkPinFormStatus();
                    }
                }
            }
        }*/
    }
   
}
