import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { DashboardPage } from "../../pages/dashboard/dashboard";
//import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from "../../pages/home/home";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";
import { PnkHttpService } from '../../providers/pnkutils/pnk-http.service';
import { Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
  //  providers: [GooglePlus]
})
export class LoginComponent {

    private loginForm: FormGroup;
    private forgetPasswordForm: FormGroup;
    passwordType = 'password';
    forgetPass: boolean = false;

    user: any;
    displayName: any;
    email: any;
    familyName: any;
    givenName: any;
    userId: any;
    imageUrl: any;
    formNotSubmitted = true;
    isLoggedIn: boolean = false;
    forgetPasswordEmailSent = false;
    constructor(public events: Events, private pnkHttpService: PnkHttpService, public home: HomePage, public auth: AuthenticateProvider, public homePage: HomePage, private formBuilder: FormBuilder, public navCtrl: NavController, /*private googlePlus: GooglePlus*/) {
        this.loginForm = this.formBuilder.group({
            txtLoginUsername: ['', ''],
            pwdLoginPassword: ['', '']
        });
        this.forgetPasswordForm = this.formBuilder.group({
            txtForgetPasswordUserEmail: ['', Validators.compose([Validators.required, Validators.minLength(6),
            Validators.pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
            ])],
        });
    }

    ngOnInit() {
        if (localStorage.getItem('userData') != null && localStorage.getItem('token') != null) {
            //this.auth.setToken(localStorage.getItem('token'));
           // alert("UserDatatypeAtLogin:"+typeof localStorage.getItem('userData'));
            //this.auth.userData = localStorage.getItem('userData');
            this.auth.spinner();
            this.auth.appInit().then(() => {
                this.auth.spinnerEnable.dismiss();
                if (this.auth.userData != null) {
                    this.auth.loggedIn = true;
                    this.home.pinVerification = true;
                    if (this.auth.userData.userfourdigitpinstatus == 1) {
                        this.auth.userPinSetStatus = true;
                    } else {
                        this.auth.userPinSetStatus = false;
                    }
                } else {
    
                }
            }, (error) => {
               // localStorage.clear();
               this.auth.spinnerEnable.dismiss();
               this.auth.loggedIn = false;
               this.home.pinVerification = false;
               //this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = error;
                this.auth.toast();
            });
           /* if (this.auth.userData != null) {
                this.auth.loggedIn = true;
                this.home.pinVerification = true;
                if (this.auth.userData.userfourdigitpinstatus == 1) {
                    this.auth.userPinSetStatus = true;
                } else {
                    this.auth.userPinSetStatus = false;
                }
            } else {

            }*/
        }
    }
/*
    login() {
        this.googlePlus.login({})
            .then(res => {
                this.displayName = res.displayName;
                this.email = res.email;
                this.familyName = res.familyName;
                this.givenName = res.givenName;
                this.userId = res.userId;
                this.imageUrl = res.imageUrl;
                this.isLoggedIn = true;
                this.navCtrl.setRoot(DashboardPage);
            })
            .catch(err => console.error(err));
    }

    logout() {
        this.googlePlus.logout()
            .then(res => {
                console.log(res);
                this.displayName = "";
                this.email = "";
                this.familyName = "";
                this.givenName = "";
                this.userId = "";
                this.imageUrl = "";
                this.isLoggedIn = false;
            })
            .catch(err => console.error(err));
    }
*/
    loginByEmailFormSubmit() {
        if ((this.loginForm.value.txtLoginUsername != '') && (this.loginForm.value.pwdLoginPassword != '')) {
            this.auth.spinner();
            this.auth.Login(this.loginForm.value).then(() => {
                this.auth.loggedIn = true;
                this.auth.spinnerEnable.dismiss();
                this.home.pinVerification = true;
                this.events.publish('user:created', this.auth.userData, Date.now());
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = error;
                this.auth.toast();
            });
        } else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'User Name or password field Empty';
            this.auth.toast();
        }
    }


    forgetPassword() {
        this.homePage.forgetPassword = !this.homePage.forgetPassword;
        this.forgetPass = !this.forgetPass;
    }

    resetPassword() {
        if (this.forgetPasswordForm.value.txtForgetPasswordUserEmail != '') {
            this.auth.spinner();
            this.auth.ResetPasswordByEmail(this.forgetPasswordForm.value).then(() => {
                this.auth.spinnerEnable.dismiss();
                this.forgetPasswordEmailSent = true;
                this.auth.toastDesignClass = 'success';
                this.auth.toast();
                this.forgetPassword();
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = error;
                this.auth.toast();
            });
        } else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'Field is Empty';
            this.auth.toast();
        }
    }

    resendResetLink() {
        if (this.forgetPasswordForm.value.txtForgetPasswordUserEmail != '') {
            this.auth.spinner();
            this.auth.ResetPasswordByEmail(this.forgetPasswordForm.value).then(() => {
                this.auth.spinnerEnable.dismiss();
                this.forgetPasswordEmailSent = true;
                this.auth.toastDesignClass = 'success';
                this.auth.toast();
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = error;
                this.auth.toast();
            });
        } else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'Field is Empty';
            this.auth.toast();
        }
    }

    signup() {
        this.homePage.signup = true;
        this.homePage.login = false;
    }

    togglePasswordView() {
        if (this.passwordType == 'password') {
            this.passwordType = 'text';
        } else {
            this.passwordType = 'password';
        }
    }

}
