import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { TwoStepVerificationComponent } from '../two-step-verification/two-step-verification';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AppUtils } from '../../providers/apputils/apputils';
/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  modalData:any;
  twostepStatus:any;
  constructor(public navCtrl: NavController ,public params: NavParams, public viewCtrl: ViewController, public appUtils:AppUtils) {
    this.modalData = params.get('modalData');
    this.twostepStatus = params.get('twostepStatus');
  }

  changeStatus(val){
    if(val == 'disabled'){
      this.navCtrl.push(TwoStepVerificationComponent).then(()=>{
        this.viewCtrl.dismiss();
      });
    }else if(val == 'enabled'){
      
    }
  }

  dismiss(){
    this.appUtils.TwoFACheckStatus=true;
    this.viewCtrl.dismiss();
  }

}
