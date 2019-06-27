import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TwoStepVerificationComponent } from '../../components/two-step-verification/two-step-verification';
import { ChangepinComponent } from '../../components/changepin/changepin';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  GoToTowFA(){
    let twoFaModal = this.modalCtrl.create(TwoStepVerificationComponent, {
      modalData: ""
    });
    twoFaModal.present();
  }
  GoToChangePin(){
    let ChangePinModal = this.modalCtrl.create(ChangepinComponent, {
      modalData: ""
    });
    ChangePinModal.present();
  }
}
