import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ViewChild} from '@angular/core';
import { NavController , NavParams, Slides } from 'ionic-angular';
/**
 * Generated class for the FiatHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fiat-history',
  templateUrl: 'fiat-history.html'
})
export class FiatHistoryComponent {

  historyData = "0";
  @ViewChild('slider')  slider:Slides;
  private todo: FormGroup;
  transactionHistory: any;

  constructor(private formBuilder: FormBuilder, public viewCtrl: ViewController,) {

    this.todo = this.formBuilder.group({
      depositAmount: [''],
      frombankName: [''],
      frombankAccount: [''],
      bankRefNo: [''],
      description: [''],
      accToDepositIn: [''],
      transPass: [''],
    });

    this.transactionHistory = [
      {
        'id': '888',
        'date': 'date',
        'currAmount': 'amount',
        'currFee': 'Current Fee',
        'currNet': 'current Net',
        'satus': 'Status'
      },
      {
        'id': '777',
        'date': 'date',
        'currAmount': 'amount',
        'currFee': 'Current Fee',
        'currNet': 'current Net',
        'satus': 'Status'
      },
      {
        'id': '555',
        'date': 'date',
        'currAmount': 'amount',
        'currFee': 'Current Fee',
        'currNet': 'current Net',
        'satus': 'Status'
      },
      {
        'id': '111',
        'date': 'date',
        'currAmount': 'amount',
        'currFee': 'Current Fee',
        'currNet': 'current Net',
        'satus': 'Status'
      },
      {
        'id': '252',
        'date': 'date',
        'currAmount': 'amount',
        'currFee': 'Current Fee',
        'currNet': 'current Net',
        'satus': 'Status'
      }
    ]
  }

  logForm() {
    console.log(this.todo.value)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  SelectedTab(ind){
    this.slider.slideTo(ind);
  }
  moveButton($event){
    this.historyData = $event._snapIndex.toString();
  }
}
