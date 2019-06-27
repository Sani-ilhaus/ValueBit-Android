import {Component} from '@angular/core';
import {Events, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {FiatProvider} from "../../../providers/fiat/fiat";

/**
 * Generated class for the FiatWithdrawalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fiat-withdrawal',
  templateUrl: 'fiat-withdrawal.html'
})
export class FiatWithdrawalComponent {
  private todo: FormGroup;
  formActive: boolean = true;
  twoStepActive: boolean = false;
  sendTo: any;
  called = false;
  workinprogress:boolean= false;
  constructor(public fiat: FiatProvider, public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController) {

    this.sendTo = 'FiatWithdrawalComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'FiatWithdrawalComponent') {
        this.submitDataOnSuccess();
      }
    });

    this.todo = this.formBuilder.group({
      withdrawalAmount: ['',Validators.required],
      nameofAccHolder: ['',Validators.required],
      bankName: ['',Validators.required],
      accNo: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
      ifscCode: ['',Validators.required],
      swiftCode:['',Validators.required],
    });
  }

  submitDataOnSuccess() {
    if (!this.called) {
      this.called = true;
      this.fiat.FiatWithdraw(this.todo.value).then(() => {
        this.called = false;
      }, (error) => {
        this.called = false;
        console.log(error);
      })
    }
  }


  logForm() {
     /// work in progress
     this.workinprogress = true;
    this.formActive = false;
    this.twoStepActive = true;
    console.log(this.todo.value)
  }

  moveBack() {
    this.formActive = true;
    this.twoStepActive = false;
    this.todo.reset();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
