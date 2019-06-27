import {Component} from '@angular/core';
import {Events, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {FiatProvider} from "../../../providers/fiat/fiat";

/**
 * Generated class for the FiatDepositComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fiat-deposit',
  templateUrl: 'fiat-deposit.html'
})
export class FiatDepositComponent {
  private todo: FormGroup;
  formActive: boolean = true;
  twoStepActive: boolean = false;
  sendTo: any;
  called = false;
  workinprogress:boolean= false;
  constructor(public fiat: FiatProvider, public events: Events, private formBuilder: FormBuilder, public viewCtrl: ViewController) {

    this.sendTo = 'FiatDepositComponent';

    events.subscribe('twoSF:verified', (twoSF, component) => {
      if (component == 'FiatDepositComponent') {
        this.submitDataOnSuccess();
      }

    });

    this.todo = this.formBuilder.group({
      depositAmount:['', Validators.compose([Validators.required, Validators.minLength(6)])],
     frombankName: ['nes',Validators.required],
      frombankAccount: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      bankRefNo: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     accToDepositIn: ['n64', Validators.required],
      transPass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  submitDataOnSuccess() {
    if (!this.called) {
      this.called = true;
      this.fiat.FiatDeposit(this.todo.value).then(() => {
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
  //  return
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
