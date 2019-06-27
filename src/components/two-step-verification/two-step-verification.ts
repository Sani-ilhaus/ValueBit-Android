import { Component, ViewChild, Inject, forwardRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { NavController, Events, ViewController } from 'ionic-angular';
import { AppUtils } from '../../providers/apputils/apputils';

/**
 * Generated class for the TwoStepVerificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'two-step-verification',
    templateUrl: 'two-step-verification.html'
})
export class TwoStepVerificationComponent {

    inpComp = false;
    @ViewChild('twopin') twopin: ElementRef;

    actualPin: any = '';
    reverify = false;
    twoStepTpin: number;
    /*private verifyTpin: FormGroup;
    private reverifyTpin: FormGroup;*/
    twoStep: any = {};
    formStatus = false;
    twosf: boolean;
    componentName: any = 'TwoStepVerificationComponent';
    pinIsEqual = false;
    twofaDisableDiv: boolean;
    twofaEnableDiv: boolean;

    constructor(@Inject(forwardRef(() => AuthenticateProvider)) public auth: AuthenticateProvider, public events: Events, public navCtrl: NavController, private formBuilder: FormBuilder, private viewCtrl: ViewController, private appUtils: AppUtils) {

        events.subscribe('twoSF:verified', (twoSF, component) => {
            // this.disableTwoSF(twoSF, component);
            twoSF = null;
            component = null;
        });
    }

    dismiss() {
        this.navCtrl.pop();
    }

    getValue($event) {
        if ($event.target.value.length == 6) {
            if (!this.reverify) {
                this.actualPin = $event.target.value;
                //re entering the same pin
                $event.target.value = '';
                this.setFocus();
                this.reverify = true;
                this.inpComp = false;
            } else {
                if (this.actualPin == $event.target.value) {
                    this.pinIsEqual = true;
                } else {
                    // this.auth.spinnerEnable.dismiss();
                    this.appUtils.ShowToast("Entered pins are not matched.", "bottom", 6000);
                    $event.target.value = '';
                    this.actualPin = '';
                    this.reverify = false;
                    this.inpComp = false;
                    this.setFocus();
                }
            }
        }
    }

    submit() {
        //alert("SubmitCalled")
        if (this.pinIsEqual) {
            this.appUtils.ShowLoader();
            this.twoStep.txtTwoFactorAuthenticatorCode = this.actualPin;
            this.inpComp = true;
            this.auth.twoStepVerification(this.twoStep).then((res) => {

                // this.auth.twoSFVerify().then(() => {
                this.appUtils.HideLoader();
                this.appUtils.ShowToast(res, "bottom", 6000);
                this.auth.twoFactorMode = "manual";
                this.auth.twoFactorStatus = 1;
                this.navCtrl.pop();
                // }, (error) => {
                //     this.inpComp = false;
                //     this.appUtils.HideLoader();
                //     this.auth.toastMsg = error;
                //     this.auth.toast();
                //     this.navCtrl.pop();
                // });
            }, (error) => {
                this.inpComp = false;
                this.appUtils.HideLoader();
                this.appUtils.ShowToast(error, "bottom", 6000);
            });
        }
    }

    ngOnInit() {
        this.componentName = 'TwoStepVerificationComponent';
        this.twofaDisableDiv = false;
        this.twofaEnableDiv = false;
        if (this.auth.twoFactorStatus == 0) {
            //this.setFocus();
            this.twosf = false;
        } else {
            this.twosf = true;
        }
    }

    setFocus() {
        setTimeout(() => {
            this.twopin.nativeElement.focus();
        }, 500);
    }
    ChangeTwoFA(event) {
        //this.appUtils.ShowLoader();
        //alert("Event::" + event + ", TwoSFToggle:" + this.twosf);
        if (event.status) {
            this.appUtils.ShowLoader();
            this.auth.twoSFPasswordDisable(event.data).then((res) => {
                this.appUtils.HideLoader();
                this.auth.twoFactorMode = "disabled";
                this.auth.twoFactorStatus = 0;
                this.appUtils.ShowToast(res, "bottom", 6000);
                this.navCtrl.pop();
            }, (error) => {
                this.appUtils.HideLoader();
                console.log(error);
            });
        }
    }

    /*disableTwoSF(twoSF, component) {
        alert("DisableEventCalled:"+component+", "+JSON.stringify(twoSF));
        if ((component == TwoStepVerificationComponent) && (twoSF != undefined)) {
            this.auth.twoSFPasswordDisable(twoSF.txtTwoFactorAuthenticatorCode).then(() => {
                this.auth.twoSFVerify().then(() => {
                    this.navCtrl.pop();
                }, (error) => {

                });
            }, (error) => {
                this.appUtils.
                console.log(error);
            });
        }
    }*/

    toggleTwoSF() {
        //alert("BeforeToggle::"+this.twosf+", TwoFaStatus::"+this.auth.twoFactorStatus);      
        //this.twosf = !this.twosf;
        //alert("AfterToggle::" + this.twosf + ", TwoFaStatus::" + this.auth.twoFactorStatus);
        if (this.auth.twoFactorStatus == 0) {
            //  alert("inEnable");
            this.twofaDisableDiv = false;
            this.twofaEnableDiv = true;
            this.setFocus();
        } else {
            //alert("InDisable");
            // this.twosf = true;
            this.twofaDisableDiv = true;
            this.twofaEnableDiv = false;
        }
    }
    CloseModal() {
        this.viewCtrl.dismiss();
    }

    /*TpinVerification() {
        this.auth.spinner();
        this.twoStepTpin = this.verifyTpin.value.Tpin1 + this.verifyTpin.value.Tpin2 + this.verifyTpin.value.Tpin3 + this.verifyTpin.value.Tpin4 + this.verifyTpin.value.Tpin5 + this.verifyTpin.value.Tpin6;
        let temp = this.reverifyTpin.value.Tpin11 + this.reverifyTpin.value.Tpin22 + this.reverifyTpin.value.Tpin33 + this.reverifyTpin.value.Tpin44 + this.reverifyTpin.value.Tpin55 + this.reverifyTpin.value.Tpin66;
        if ((this.twoStepTpin == temp) && (this.formStatus)) {
            this.twoStep.txtTwoFactorAuthenticatorCode = this.twoStepTpin;
            this.auth.twoStepVerification(this.twoStep).then(() => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastMsg = '2-Step Verification Enabled';
                this.auth.toast();
                this.auth.twoSFVerify().then(()=>{
                    this.navCtrl.pop();
                },(error)=>{

                });
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastMsg = error;
                this.auth.toast();
            });
        } else {
            this.auth.spinnerEnable.dismiss();
        }
    }

    ngOnInit() {
        this.componentName = TwoStepVerificationComponent;
        if(this.auth.twoFactorStatus == 0){
            setTimeout(() => {
                this.Tpin1.setFocus();
            }, 1000);
        }else{
            this.twosf = true;
        }
    }

    toggleTwoSF(){
        
    }


    changeFocus(val,ev) {
        if(ev.key == 'Backspace'){
            this.reverifyTpin.reset();
            setTimeout(()=>{
                this.Tpin1.setFocus();                
            },350);
        }else{
            if (val == 'Tpin1') {
                this.Tpin2.setFocus();
            } else if (val == 'Tpin2') {
                this.Tpin3.setFocus();
            } else if (val == 'Tpin3') {
                this.Tpin4.setFocus();
            } else if (val == 'Tpin4') {
                this.Tpin5.setFocus();
            } else if (val == 'Tpin5') {
                this.Tpin6.setFocus();
            } else if (val == 'Tpin6') {
                this.reverify = true;
                setTimeout(() => {
                    this.Tpin11.setFocus();
                }, 1000)
            }
        }
    }

    checkTpinFormStatus() {
        if ((this.verifyTpin.value.Tpin1 != '') && (this.verifyTpin.value.Tpin2 != '') && (this.verifyTpin.value.Tpin3 != '') && (this.verifyTpin.value.Tpin4 != '') && (this.verifyTpin.value.Tpin5 != '') && (this.verifyTpin.value.Tpin6 != '')) {
            if ((this.verifyTpin.value.Tpin11 != '') && (this.verifyTpin.value.Tpin22 != '') && (this.verifyTpin.value.Tpin33 != '') && (this.verifyTpin.value.Tpin44 != '') && (this.verifyTpin.value.Tpin55 != '') && (this.verifyTpin.value.Tpin66 != '')) {
                this.formStatus = true;
                this.TpinVerification();
            }
        } else {
            this.verifyTpin.reset();
            this.reverifyTpin.reset();
        }
    }

    rechangeFocus(val,ev) {
        if(ev.key == 'Backspace'){
            this.reverifyTpin.reset();
            setTimeout(()=>{
                this.Tpin1.setFocus();                
            },350);
        }else{
            if (val == 'Tpin11') {
                this.Tpin22.setFocus();
            } else if (val == 'Tpin22') {
                this.Tpin33.setFocus();
            } else if (val == 'Tpin33') {
                this.Tpin44.setFocus();
            } else if (val == 'Tpin44') {
                this.Tpin55.setFocus();
            } else if (val == 'Tpin55') {
                this.Tpin66.setFocus();
            } else if (val == 'Tpin66') {
                this.checkTpinFormStatus();
                //this.navCtrl.setRoot(DashboardPage);
                //this.reverify = true;
            }
        }
    }*/
}
