import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Events, NavController, ViewController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the KycDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
    selector: 'kyc-details',
    templateUrl: 'kyc-details.html'
})
export class KycDetailsComponent {

    private kycDetailsForm: FormGroup;
    formActive: boolean = true;
    twoStepActive: boolean = false;
    disableTrue = true;
    componentName: any;

    constructor(public navCtrl: NavController, 
        private events: Events, private auth: AuthenticateProvider,
         private formBuilder: FormBuilder, private viewCtrl: ViewController, private alertCtrl: AlertController) {
        this.kycDetailsForm = this.formBuilder.group({
            userIdProfFront: ['', ''],
            userIdProfBack: ['', ''],
            addProfFront: ['', ''],
            addProfBack: ['', ''],
            bankProfFront: ['', ''],
            bankProfBack: ['', '']
        });

        // this.events.subscribe('twoSF:verified', (twoSF, component) => {
        //     this.kycDetailsFromSubmit(twoSF, component);
        //     twoSF = null;
        //     component = null;
        // });
    }

    checkTwoSf() {
        this.twoStepActive = true;
    }

    ngOnInit() {
        this.componentName = KycDetailsComponent;
        console.log(this.auth.twoFactorStatus);
        this.auth.GetKycDetails().then(() => {
            this.kycDetailsForm.patchValue({
                userIdProfBack: this.auth.userKycData.id_proof_back,
                userIdProfFront: this.auth.userKycData.id_proof_front,
                addProfBack: this.auth.userKycData.addr_proof_back,
                addProfFront: this.auth.userKycData.addr_proof_front,
                // bankProfBack: this.auth.userKycData.bank_proof_back,
                // bankProfFront: this.auth.userKycData.bank_proof_front
            })
           
        },(error)=>{

        });

    }


    kycDetailsFromSubmit(formvalue) {
       // alert(JSON.stringify(formvalue));
       
      //  return true;
        if((formvalue.userIdProfFront !== 'no-image.png' && formvalue.userIdProfFront !== null) 
        && (formvalue.userIdProfBack !== 'no-image.png' &&   formvalue.userIdProfBack !== null) 
        && ( formvalue.addProfFront !== 'no-image.png' &&    formvalue.addProfFront !== null)
        && (formvalue.addProfBack !== 'no-image.png' && formvalue.addProfBack !== null) 
        // && (formvalue.bankProfFront !== 'no-image.png' && formvalue.bankProfFront !== null)
        // && (formvalue.bankProfBack !== 'no-image.png' &&  formvalue.bankProfBack !== null))
        )
         {
           //   alert("into if condition");
           //  return; 
         

           
           // return true;
            console.log(formvalue);
            // if ((component == KycDetailsComponent) && (twoSF != undefined)) {
                this.auth.spinner();
                this.auth.postKycDetails(this.kycDetailsForm.value).then(() => {
                    this.auth.toastMsg = "Kyc Details Submitted";
                    this.auth.toastDesignClass = "success";
                    this.auth.toast();
                    this.auth.spinnerEnable.dismiss();
                    setTimeout(() => {
                        this.navCtrl.pop();
                    }, this.auth.toastTimeOut);
                    this.twoStepActive = true;
                }, (error) => {
                    this.auth.toastDesignClass = "error";
                    this.auth.toastMsg = "An error occured!";
                    this.auth.toast();
                    this.auth.spinnerEnable.dismiss();
                });
            // } else {
            //     this.auth.toastDesignClass = "error";
            //     this.auth.toastMsg = "Two step Verification is Not Enabled!";
            //     this.auth.toast();
            // }
            
        }
      
       else{
          
           let alert = this.alertCtrl.create({
            title: '',
            subTitle: '',
            message:'Please upload all documents',
            buttons: ['ok'],
         
          });
          alert.present();
       }
      
    }

    uploadDocs(val) {
        if (this.auth.twoFactorStatus == '1') {
            this.auth.UploadUserImage('kyc').then(() => {
                this.getImagePath(val);
            }, (error) => {
                this.auth.toastDesignClass = "error";
                this.auth.toastMsg = "An error occired!";
                this.auth.toast();
                this.auth.spinnerEnable.dismiss();
            })
        } else {
            this.auth.toastDesignClass = "error";
            this.auth.toastMsg = "Two step Verification is Not Enabled!";
            this.auth.toast();
        }
    }

    getImagePath(val) {
        if (val == 'userIdProfFront') {
            this.kycDetailsForm.value.userIdProfFront = this.auth.uploadImagePath;
        } else if (val == 'userIdProfBack') {
            this.kycDetailsForm.value.userIdProfBack = this.auth.uploadImagePath;
        } else if (val == 'addProfFront') {
            this.kycDetailsForm.value.addProfFront = this.auth.uploadImagePath;
        } else if (val == 'addProfBack') {
            this.kycDetailsForm.value.addProfBack = this.auth.uploadImagePath;
        // } else if (val == 'bankProfFront') {
        //     this.kycDetailsForm.value.bankProfFront = this.auth.uploadImagePath;
        // } else if (val == 'bankProfBack') {
        //     this.kycDetailsForm.value.bankProfBack = this.auth.uploadImagePath;
        } else {
            alert('invalid input');
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
