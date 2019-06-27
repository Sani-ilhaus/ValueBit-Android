import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { AppUtils } from '../../providers/apputils/apputils';
declare let QRious: any;
/**
 * Generated class for the CopycurrencyaddressmodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'copycurrencyaddressmodal',
  templateUrl: 'copycurrencyaddressmodal.html'
})
export class CopycurrencyaddressmodalComponent {

  modalData: any;
  constructor(public params: NavParams, private appUtils: AppUtils, private clipboard: Clipboard, private viewCtrl: ViewController) {
    console.log('Hello CopycurrencyaddressmodalComponent Component');
    this.modalData = this.params.get('modalData');
    //alert(JSON.stringify(this.modalData,null,4));
  }
  ionViewDidLoad() {
    // alert("modalData:"+JSON.stringify(this.modalData, null ,4));
    setTimeout(() => {
      var qr = new QRious({
        element: document.getElementById('canvasWalletAddress'),
        value: this.modalData.curr_addr
      });
    }, 100);

  }
  CopyAddress() {
    this.clipboard.copy(this.modalData.curr_addr);
    this.appUtils.ShowToast("Address Copied to clipboard", "bottom", 6000);
  }
  CloseModal(){
    this.viewCtrl.dismiss();
  }
}
