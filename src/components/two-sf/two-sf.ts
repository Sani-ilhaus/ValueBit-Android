import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { Platform, Events } from "ionic-angular";
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AppUtils } from '../../providers/apputils/apputils';

/**
 * Generated class for the TwoSfComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
    selector: 'two-sf',
    templateUrl: 'two-sf.html'
})
export class TwoSfComponent {

    @Input('sendTo') sendTo;
    @Output() ChangeTwoFaStatus = new EventEmitter();

    private twoSFForm: FormGroup;
    inpComp = false;
    @ViewChild('twopin') twopin: ElementRef;

    constructor(private events: Events, private navCtrl: NavController, private viewCtrl: ViewController, private formBuilder: FormBuilder, private auth: AuthenticateProvider, private platform: Platform, private appUtils:AppUtils) {
        this.twoSFForm = this.formBuilder.group({
            txtTwoFactorAuthenticatorCode: ['', Validators.compose([Validators.required, Validators.minLength(6) , Validators.minLength(6)])]
        });
    }

    ngOnInit() {
        //console.log(this.sendTo);
    }

    twoSF() {
        //alert("Before:"+this.twoSFForm.value.txtTwoFactorAuthenticatorCode)
        if (this.twoSFForm.value.txtTwoFactorAuthenticatorCode != '' && this.twoSFForm.value.txtTwoFactorAuthenticatorCode != null) {
            this.appUtils.ShowLoader();
            this.auth.twoSFPasswordVerify(this.twoSFForm.value).then((res) => {
                this.appUtils.HideLoader();
                this.events.publish('twoSF:verified', this.twoSFForm.value, this.sendTo);
                this.auth.twoSFPassVerificationStatus = true;
                this.auth.twoFactorStatus = 0;
                
                if (this.sendTo != 'CryptoCurrencyBuyComponent' && this.sendTo != 'CryptoCurrencySendComponent' && this.sendTo != 'TwoStepVerificationComponent') {  
                   // alert("InTwoFA");                
                    this.appUtils.ShowToast(res,"bottom",6000);
                    this.twoSFForm.reset();
                }
                if(this.sendTo == 'TwoStepVerificationComponent'){
                    //alert(this.twoSFForm.value.txtTwoFactorAuthenticatorCode);
                    var data = {status:true, data:{txtTwoFactorAuthenticatorCode:this.twoSFForm.value.txtTwoFactorAuthenticatorCode}};
                    this.ChangeTwoFaStatus.emit(data);
                    //this.twoSFForm.reset();
                   // this.navCtrl.pop();
                }

            }, (error) => {
                this.appUtils.HideLoader();
                this.auth.twoSFPassVerificationStatus = false;
                this.appUtils.ShowToast(error,"bottom",6000);
                this.twoSFForm.reset();
            });
        } else {
            this.appUtils.ShowToast("Please enter your Verification Password", "bottom",6000);
        }
    }

    dismiss() {
        this.navCtrl.pop();
    }

    exitApp() {
        this.navCtrl.pop();
    }

}
