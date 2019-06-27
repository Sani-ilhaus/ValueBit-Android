import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { NavController, Events } from 'ionic-angular';
/**
 * Generated class for the BankDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'bank-details',
    templateUrl: 'bank-details.html'
})
export class BankDetailsComponent {

    private bankDetailsForm: FormGroup;
    formActive: boolean = true;
    twoStepActive: boolean = false;
    componentName: any;
    fetchedBankDetails:any = [];
    bankdetails:any;

    constructor(private events: Events, private formBuilder: FormBuilder, private viewCtrl: ViewController, private auth: AuthenticateProvider) {
        this.bankDetailsForm = this.formBuilder.group({
            nameOnBankAccount: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            bankName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            accountNumber: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            ifscCode: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            swiftCode: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            bankBranchName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            bankBranchAddress: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
        });

        // events.subscribe('twoSF:verified', (twoSF, component) => {
        //     this.verifyTwoSf(twoSF, component);
        //     twoSF = null;
        //     component = null;
        // });
    }

    ngOnInit() {
      //  this.componentName = BankDetailsComponent;
        this.auth.getBankDetails().then(() => {
            this.fetchedBankDetails = this.auth.bankDetails;
           // alert(JSON.stringify(this.fetchedBankDetails));
            //console.log("bank kamlesh pal" +this.fetchedBankDetails);
            this.bankDetailsForm.patchValue({
                nameOnBankAccount: this.auth.bankDetails[0].bank_acc_name,
                bankName: this.auth.bankDetails[0].bank_name,
                accountNumber: this.auth.bankDetails[0].bank_acc_no,
                ifscCode: this.auth.bankDetails[0].bank_ifsc_code,
                swiftCode: this.auth.bankDetails[0].bank_swift_code,
                bankBranchName: this.auth.bankDetails[0].bank_branch,
                bankBranchAddress: this.auth.bankDetails[0].bank_address,
              })
        }, (error) => {
            console.log(error);
        })
    }


    saveBankDetails(formdata) {
        //console.log(formdata);
       // alert(formdata);
        // this.bankdetails = 
        // if ((component == BankDetailsComponent) && (twoSF != undefined)) {
            this.auth.spinner();
            this.auth.postBankDetails(this.bankDetailsForm.value).then(() => {
                this.auth.spinnerEnable.dismiss();
                this.formActive = false;
                this.auth.toastDesignClass = "success";
                this.auth.toastMsg = "Bank Details saved successfully";
                this.auth.toast();
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = "error";
                this.auth.toastMsg = "An error occured";
                this.auth.toast();
            });
        // }
    }

    // checkTwoSf() {
    //     this.twoStepActive = true;
    // }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
