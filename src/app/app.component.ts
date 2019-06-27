import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfileComponent } from "../components/staticPages/profile/profile";
import { SupportComponent } from "../components/staticPages/support/support";
import { HowitworksComponent } from "../components/staticPages/howitworks/howitworks";
import { ContactusComponent } from "../components/staticPages/contactus/contactus";
import { IntroductionPage } from '../pages/introduction/introduction';
import { CareerComponent } from '../components/staticPages/career/career';
import { TwoStepVerificationComponent } from '../components/two-step-verification/two-step-verification';
import { Events } from 'ionic-angular';
import { AuthenticateProvider } from "../providers/authenticate/authenticate";
import { BankDetailsComponent } from "../components/bank-details/bank-details";
import { KycDetailsComponent } from "../components/kyc-details/kyc-details";
import { EntrypagePage } from '../pages/entrypage/entrypage';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CurrencyaddressPage } from '../pages/currencyaddress/currencyaddress';
import { AppUtils } from '../providers/apputils/apputils';
import { SettingsPage } from '../pages/settings/settings';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    user_image: any;
    @ViewChild(Nav) nav: Nav;

    // rootPage: any = CareerComponent;
    rootPage: any = EntrypagePage;
    loggedInUserName: any;
    loggedInUserImage: any;
    link = 'http://valuebit.lokhittrust.in/storage/uploads/user_';

    pages: Array<{ title: string, component: any, imgLink: any }>;
    assetsUrl:any;
    constructor(private auth: AuthenticateProvider, public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private appUtils: AppUtils) {

        events.subscribe('user:created', (user, time) => {
            this.loggedInUserName = user.user_name;
            this.loggedInUserImage = user.user_image;
        });
        this.initializeApp();

        this.pages = [

            { title: 'PROFILE', component: ProfileComponent, imgLink: 'contact' },
            { title: 'UPDATE KYC', component: KycDetailsComponent, imgLink: 'list-box' },

            { title: 'ACCOUNT SETTINGS', component: SettingsPage, imgLink: 'cog' },
            { title: 'HOW IT WORKS', component: HowitworksComponent, imgLink: 'information-circle' },
            { title: 'LOGOUT', component: null, imgLink: 'exit' }
            // {title: '2-STEP VERIFICATION', component: TwoStepVerificationComponent, imgLink: 'lock'},
            // {title: 'Bank Details', component: BankDetailsComponent, imgLink: 'cash'},
            // {title: 'SUPPORT', component: SupportComponent, imgLink: 'fa fa-question'},
            // {title: 'CURRENCY ADDRESS', component: CurrencyaddressPage, imgLink: 'locate'},
            // {title: 'CAREER', component: CareerComponent, imgLink: 'briefcase'},

            // {title: 'CONTACT US', component: ContactusComponent, imgLink: 'call'},

        ];
        this.assetsUrl = this.appUtils.GetServerUrl();
    }

    UploadProfile() {
        this.auth.UploadUserImage('profile').then((res) => {
            //this.getImagePath();
           // alert("ImageName:"+this.auth.uploadImagePath);
            //this.appUtils.ShowToast("Profile image updated!", "bottom",6000);
           // alert("UploadedImageName:"+res);
            this.auth.userData.user_image = res;
        }, (error) => {
            this.appUtils.ShowToast(error, 'bottom', 6000);
        })
    }

    initializeApp() {
        //  alert("initialize app");
        console.log("into app componet ts file");

        //  console.log(this.auth.userData.user_image);
        this.platform.ready().then(() => {
            if (localStorage.getItem('userData') != null && localStorage.getItem('token')) {
                // alert("InitializeData"+localStorage.getItem('token'));
                this.auth.setToken(localStorage.getItem('token'));
                this.auth.userData = JSON.parse(localStorage.getItem('userData'));
                //let temp = JSON.parse(localStorage.getItem('userData'));
                // this.auth.getUserData().then(() => {
                //    this.user_image=  this.auth.userData.user_name;
                // });
                this.loggedInUserName = this.auth.userData.user_name;
                this.loggedInUserImage = this.link + this.loggedInUserName + '/' + this.auth.userData.user_image;
                console.log(this.auth.userData.user_image);
                console.log(this.loggedInUserImage);
                this.splashScreen.hide();
            }
            else {
                // alert("User not available")
                if (localStorage.getItem('firstLaunch') == 'Done') {
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();
                } else {
                    this.rootPage = IntroductionPage;
                    localStorage.setItem('firstLaunch', 'Done');
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();
                }
            }

        });
    }

    openPage(page) {
        // alert("inAppComponent:OpenPage")
        if (page.component) {
            this.nav.push(page.component);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            this.auth.loggedIn = false;
            setTimeout(() => {
                this.nav.setRoot(EntrypagePage);
            }, 200)
        }
    }
}
