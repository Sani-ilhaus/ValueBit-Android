import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from "../../pages/home/home";
import { AuthenticateProvider } from "../../providers/authenticate/authenticate";

@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})
export class SignupComponent {

    private signupForm: FormGroup;
    passwordType = 'password';
    msg: any;
    usernameavailable = false;
    emailavailable = false;

    constructor(private formBuilder: FormBuilder, public homePage: HomePage, public auth: AuthenticateProvider) {
        this.signupForm = this.formBuilder.group({
            txtSignUpUserEmail: ['', Validators.compose([Validators.required, Validators.minLength(6),
            Validators.pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
            ])],
            pwdSignUpUserPassword: ['', Validators.compose([Validators.required, Validators.minLength(6),
            ])],
            txtSignUpUserName: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    checkUsernameAvailability(username) {
        console.log(username.value);
        if (username.value.length > 5) {
            this.auth.checkUserName(username.value).then(() => {
                this.usernameavailable = true;
            }, (error) => {
                this.usernameavailable = false;
                this.msg = error;
                // this.signupForm.controls['txtSignUpUserName'].valid = false;
            })
        } else {
            this.usernameavailable = false;
        }
    }


    checkEmailAvailability(email) {
        if (this.signupForm.controls['txtSignUpUserEmail'].valid) {
            this.auth.checkEmail(email.value).then(() => {
                this.emailavailable = true;
            }, (error) => {
                this.emailavailable = false;
                this.msg = error;
                // this.signupForm.controls['txtSignUpUserEmail'].valid = false;
            })
        } else {
            this.emailavailable = false;
        }
    }

    cancelSignup() {
        this.homePage.login = true;
        this.homePage.signup = false;
    }

    signupEmailFormSubmit() {
        if ((this.signupForm.value.txtSignUpUserEmail != '') && (this.signupForm.value.pwdSignUpUserPassword != '')) {
            this.auth.spinner();
            this.auth.Register(this.signupForm.value).then(() => {
                this.auth.spinnerEnable.dismiss();
                this.auth.toastDesignClass = 'success';
                this.signupForm.reset();
                this.auth.toastMsg = this.auth.temp;
                this.auth.toast();
                setTimeout(() => {
                    this.cancelSignup();
                }, this.auth.toastTimeOut);
            }, (error) => {
                this.auth.spinnerEnable.dismiss();
                this.signupForm.reset();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = error;
                this.auth.toast();
            });
        } else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'All the fields are necessary';
            this.auth.toast();
        }
    }
}
