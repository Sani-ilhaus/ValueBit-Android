import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AuthenticateProvider} from "../../providers/authenticate/authenticate";
import {PnkHttpService} from "../../providers/pnkutils/pnk-http.service";

/**
 * Generated class for the EntrypagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-entrypage',
    templateUrl: 'entrypage.html',
})
export class EntrypagePage {

    constructor(public events: Events, private pnkHttpService: PnkHttpService, public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticateProvider, private menuCtrl:MenuController) {

    }
    ionViewDidEnter() {
        this.menuCtrl.swipeEnable(false);
      }
    ngOnInit() {
        if (localStorage.getItem('userData') != null) {
           // alert("typeofUser:"+typeof localStorage.getItem('userData') + ", TypeOfToken::"+typeof localStorage.getItem('token'));
            this.auth.userData = JSON.parse(localStorage.getItem('userData'));
            this.pnkHttpService.token = localStorage.getItem('token');
            //this.home.pinVerification = true;
            this.navCtrl.setRoot(HomePage);
            if (this.auth.userData != null) {
                this.auth.loggedIn = true;
                if (this.auth.userData.userfourdigitpinstatus == 1) {
                    this.auth.userPinSetStatus = true;
                } else {
                    this.auth.userPinSetStatus = false;
                }
            } else {

            }
        }
    }

    GoTo(val) {
        if (val == 'login') {
            this.navCtrl.push(HomePage, {
                data: 'login'
            })
        } else if (val == 'reg') {
            this.navCtrl.push(HomePage, {
                data1: 'register'
            })
        }
    }

}
