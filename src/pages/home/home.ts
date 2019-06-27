import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login = true;
  signup = false;
  forgetPassword = false;
  pinVerification = false;
  constructor(public navCtrl: NavController, public platform: Platform, public navParams:NavParams, private menuCtrl:MenuController) {
      if (localStorage.getItem('userData') != null) {
          this.pinVerification = true;
      } else if (this.navParams.get('data') == "login") {
          this.login = true;
          this.signup = false;
          this.forgetPassword = false;
          this.pinVerification = false;
      } else {
          this.signup = true;
          this.login = false;
          this.forgetPassword = false;
          this.pinVerification = false;
      }
  }

  back(){
    if(this.forgetPassword){
      this.forgetPassword = false;
      this.login = true;
    }else if(this.navParams.get('data1') == "register"){
      this.navCtrl.pop();
    } else if(this.signup){
      this.signup = false;
      this.login = true;
    } else if(this.navParams.get('data') == "login"){
      this.navCtrl.pop();
    }
  }

  ngOnInit(){
  }

  exitApp(){
    this.platform.exitApp();
  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menuCtrl.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
}
