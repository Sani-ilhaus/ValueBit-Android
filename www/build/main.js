webpackJsonp([10],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the SpinnerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SpinnerComponent = (function () {
    function SpinnerComponent() {
        console.log('Hello SpinnerComponent Component');
        this.text = 'Hello World';
    }
    SpinnerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'spinner',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\spinner\spinner.html"*/'<div class="spinner_design">\n  <div class="spinner">\n    <div class="rect1"></div>\n    <div class="rect2"></div>\n    <div class="rect3"></div>\n    <div class="rect4"></div>\n    <div class="rect5"></div>\n  </div>\n</div>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\spinner\spinner.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());

//# sourceMappingURL=spinner.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwoStepVerificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





/**
 * Generated class for the TwoStepVerificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var TwoStepVerificationComponent = (function () {
    function TwoStepVerificationComponent(auth, events, navCtrl, formBuilder, viewCtrl, appUtils) {
        this.auth = auth;
        this.events = events;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.appUtils = appUtils;
        this.inpComp = false;
        this.actualPin = '';
        this.reverify = false;
        /*private verifyTpin: FormGroup;
        private reverifyTpin: FormGroup;*/
        this.twoStep = {};
        this.formStatus = false;
        this.componentName = 'TwoStepVerificationComponent';
        this.pinIsEqual = false;
        events.subscribe('twoSF:verified', function (twoSF, component) {
            // this.disableTwoSF(twoSF, component);
            twoSF = null;
            component = null;
        });
    }
    TwoStepVerificationComponent.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    TwoStepVerificationComponent.prototype.getValue = function ($event) {
        if ($event.target.value.length == 6) {
            if (!this.reverify) {
                this.actualPin = $event.target.value;
                //re entering the same pin
                $event.target.value = '';
                this.setFocus();
                this.reverify = true;
                this.inpComp = false;
            }
            else {
                if (this.actualPin == $event.target.value) {
                    this.pinIsEqual = true;
                }
                else {
                    // this.auth.spinnerEnable.dismiss();
                    this.appUtils.ShowToast("Entered pins are not matched.", "bottom", 6000);
                    $event.target.value = '';
                    this.actualPin = '';
                    this.reverify = false;
                    this.inpComp = false;
                    this.setFocus();
                }
            }
        }
    };
    TwoStepVerificationComponent.prototype.submit = function () {
        var _this = this;
        //alert("SubmitCalled")
        if (this.pinIsEqual) {
            this.appUtils.ShowLoader();
            this.twoStep.txtTwoFactorAuthenticatorCode = this.actualPin;
            this.inpComp = true;
            this.auth.twoStepVerification(this.twoStep).then(function (res) {
                // this.auth.twoSFVerify().then(() => {
                _this.appUtils.HideLoader();
                _this.appUtils.ShowToast(res, "bottom", 6000);
                _this.auth.twoFactorMode = "manual";
                _this.auth.twoFactorStatus = 1;
                _this.navCtrl.pop();
                // }, (error) => {
                //     this.inpComp = false;
                //     this.appUtils.HideLoader();
                //     this.auth.toastMsg = error;
                //     this.auth.toast();
                //     this.navCtrl.pop();
                // });
            }, function (error) {
                _this.inpComp = false;
                _this.appUtils.HideLoader();
                _this.appUtils.ShowToast(error, "bottom", 6000);
            });
        }
    };
    TwoStepVerificationComponent.prototype.ngOnInit = function () {
        this.componentName = 'TwoStepVerificationComponent';
        this.twofaDisableDiv = false;
        this.twofaEnableDiv = false;
        if (this.auth.twoFactorStatus == 0) {
            //this.setFocus();
            this.twosf = false;
        }
        else {
            this.twosf = true;
        }
    };
    TwoStepVerificationComponent.prototype.setFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.twopin.nativeElement.focus();
        }, 500);
    };
    TwoStepVerificationComponent.prototype.ChangeTwoFA = function (event) {
        var _this = this;
        //this.appUtils.ShowLoader();
        //alert("Event::" + event + ", TwoSFToggle:" + this.twosf);
        if (event.status) {
            this.appUtils.ShowLoader();
            this.auth.twoSFPasswordDisable(event.data).then(function (res) {
                _this.appUtils.HideLoader();
                _this.auth.twoFactorMode = "disabled";
                _this.auth.twoFactorStatus = 0;
                _this.appUtils.ShowToast(res, "bottom", 6000);
                _this.navCtrl.pop();
            }, function (error) {
                _this.appUtils.HideLoader();
                console.log(error);
            });
        }
    };
    /*disableTwoSF(twoSF, component) {
        alert("DisableEventCalled:"+component+", "+JSON.stringify(twoSF));
        if ((component == TwoStepVerificationComponent) && (twoSF != undefined)) {
            this.auth.twoSFPasswordDisable(twoSF.txtTwoFactorAuthenticatorCode).then(() => {
                this.auth.twoSFVerify().then(() => {
                    this.navCtrl.pop();
                }, (error) => {

                });
            }, (error) => {
                this.appUtils.
                console.log(error);
            });
        }
    }*/
    TwoStepVerificationComponent.prototype.toggleTwoSF = function () {
        //alert("BeforeToggle::"+this.twosf+", TwoFaStatus::"+this.auth.twoFactorStatus);      
        //this.twosf = !this.twosf;
        //alert("AfterToggle::" + this.twosf + ", TwoFaStatus::" + this.auth.twoFactorStatus);
        if (this.auth.twoFactorStatus == 0) {
            //  alert("inEnable");
            this.twofaDisableDiv = false;
            this.twofaEnableDiv = true;
            this.setFocus();
        }
        else {
            //alert("InDisable");
            // this.twosf = true;
            this.twofaDisableDiv = true;
            this.twofaEnableDiv = false;
        }
    };
    TwoStepVerificationComponent.prototype.CloseModal = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('twopin'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TwoStepVerificationComponent.prototype, "twopin", void 0);
    TwoStepVerificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'two-step-verification',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\two-step-verification\two-step-verification.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title class="navbarApp">2-STEP VERIFICATION\n        </ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="CloseModal()">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <!-- <div>\n        <ion-list>\n            <ion-grid *ngIf="auth.twoFactorStatus == \'0\'">\n                <ion-row>\n                    <ion-col>\n                        <ion-title class="twoSfTitile" *ngIf="!reverify">Enter your verification code</ion-title>\n                        <ion-title class="twoSfTitile" *ngIf="reverify">Enter your verification code</ion-title>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n            <ion-item>\n                <ion-label style="color:#000;">2-Factor Verification Status</ion-label>\n                <ion-toggle [(ngModel)]="twosf" (ionChange)="toggleTwoSF()"></ion-toggle>\n            </ion-item>\n            <ion-grid *ngIf="auth.twoFactorStatus == \'0\'">\n                <ion-row>\n                    <ion-col>\n                        <ion-row>\n                            <input type="number" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" [disabled]="inpComp" class="pin twoPin" maxlength="4"\n                                placeholder="xxxxxx" #twopin id="twopin" autofocus/>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col class="loginBtnGrid">\n                                <button style="float:right" ion-button round outline full class="twosfBtn" (click)="submit()">VERIFY &nbsp;\n                                    <ion-icon name="md-checkmark"></ion-icon>\n                                </button>                                \n                            </ion-col>\n                            <ion-col class="loginBtnGrid">\n                                <button style="float:left" ion-button round outline full class="twosfBtn cancelBtn" (click)="dismiss()">CANCEL &nbsp;\n                                    <ion-icon name="md-close"></ion-icon>\n                                </button>                                \n                            </ion-col>\n                        </ion-row>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-list>\n    </div> -->\n    <!-- <div *ngIf="auth.twoFactorStatus == \'1\'"> -->\n    <ion-list>\n        <ion-item>\n            <ion-label style="color:#000;">2-Factor Verification Status</ion-label>\n            <ion-toggle [(ngModel)]="twosf" (ionChange)="toggleTwoSF()"></ion-toggle>\n        </ion-item>\n        <ion-item *ngIf="twofaDisableDiv">\n            <ion-row>\n                <ion-col>\n                    <ion-title class="twoSfTitile" *ngIf="!reverify">Enter your verification code</ion-title>\n                    <ion-title class="twoSfTitile" *ngIf="reverify">Enter your verification code</ion-title>\n                </ion-col>\n            </ion-row>\n            <two-sf [sendTo]="componentName" (ChangeTwoFaStatus)="ChangeTwoFA($event)"></two-sf>\n        </ion-item>\n        <ion-item>\n            <ion-grid *ngIf="twofaEnableDiv">\n                <ion-row>\n                    <ion-col>\n                        <ion-title class="twoSfTitile" *ngIf="!reverify">Enter your verification code</ion-title>\n                        <ion-title class="twoSfTitile" *ngIf="reverify">Re-enter your verification code</ion-title>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <ion-row>\n                            <input type="number" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" [disabled]="inpComp" class="pin twoPin" maxlength="4" placeholder="xxxxxx" #twopin id="twopin" autofocus/>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col class="loginBtnGrid">\n                                <button style="float:right" ion-button round outline full class="twosfBtn" (click)="submit()">VERIFY &nbsp;\n                                    <ion-icon name="md-checkmark"></ion-icon>\n                                </button>\n                                <!--button ion-button round outline type="button" (click)="signup()">Sign up</button -->\n                            </ion-col>\n                            <ion-col class="loginBtnGrid">\n                                <button style="float:left" ion-button round outline full class="twosfBtn cancelBtn" (click)="dismiss()">CANCEL &nbsp;\n                                    <ion-icon name="md-close"></ion-icon>\n                                </button>\n                                <!--button ion-button round outline type="button" (click)="signup()">Sign up</button -->\n                            </ion-col>\n                        </ion-row>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n    </ion-list>\n    <!-- </div> -->\n\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\two-step-verification\two-step-verification.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__["a" /* AppUtils */]])
    ], TwoStepVerificationComponent);
    return TwoStepVerificationComponent;
}());

//# sourceMappingURL=two-step-verification.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CopycurrencyaddressmodalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_clipboard__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CopycurrencyaddressmodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CopycurrencyaddressmodalComponent = (function () {
    function CopycurrencyaddressmodalComponent(params, appUtils, clipboard, viewCtrl) {
        this.params = params;
        this.appUtils = appUtils;
        this.clipboard = clipboard;
        this.viewCtrl = viewCtrl;
        console.log('Hello CopycurrencyaddressmodalComponent Component');
        this.modalData = this.params.get('modalData');
        //alert(JSON.stringify(this.modalData,null,4));
    }
    CopycurrencyaddressmodalComponent.prototype.ionViewDidLoad = function () {
        var _this = this;
        // alert("modalData:"+JSON.stringify(this.modalData, null ,4));
        setTimeout(function () {
            var qr = new QRious({
                element: document.getElementById('canvasWalletAddress'),
                value: _this.modalData.curr_addr
            });
        }, 100);
    };
    CopycurrencyaddressmodalComponent.prototype.CopyAddress = function () {
        this.clipboard.copy(this.modalData.curr_addr);
        this.appUtils.ShowToast("Address Copied to clipboard", "bottom", 6000);
    };
    CopycurrencyaddressmodalComponent.prototype.CloseModal = function () {
        this.viewCtrl.dismiss();
    };
    CopycurrencyaddressmodalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'copycurrencyaddressmodal',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\copycurrencyaddressmodal\copycurrencyaddressmodal.html"*/'<!-- Generated template for the CopycurrencyaddressmodalComponent component -->\n<div class="modal_content">\n  <ion-card *ngIf="modalData" class="center-img">\n    <ion-card-header no-padding>\n      <button ion-button clear small color="valuebitcolor" class="closeBtn" (click)="CloseModal()">\n        <ion-icon name="close-circle" item-end style="font-size: 2em"></ion-icon>\n      </button>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-item text-center>\n        <h1>Your {{modalData.curr_code}} address </h1>\n      </ion-item>\n      <ion-item>\n        <h2>{{modalData.curr_addr}}</h2>\n        <input type="hidden" value="{{modalData.curr_addr}}" id="curr_address" />\n        <!-- <ion-icon name="copy" item-end large (click)="CopyAddress()"></ion-icon> -->\n      </ion-item>\n      <ion-item text-center>\n        <button ion-button small round color="valuebitcolor" (click)="CopyAddress()">\n          <ion-icon name="copy" item-end large></ion-icon> Copy</button>\n      </ion-item>\n      <ion-item text-center>\n        <h1>OR</h1>\n      </ion-item>\n      <ion-item text-center>\n        <canvas id="canvasWalletAddress" height="100" width="100"></canvas>\n      </ion-item>\n    </ion-card-content>\n\n  </ion-card>\n</div>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\copycurrencyaddressmodal\copycurrencyaddressmodal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], CopycurrencyaddressmodalComponent);
    return CopycurrencyaddressmodalComponent;
}());

//# sourceMappingURL=copycurrencyaddressmodal.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_spinner_spinner__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppUtils = (function () {
    function AppUtils(toastCtrl, sanitizerObj, alertCtrl, modalCtrl) {
        this.toastCtrl = toastCtrl;
        this.sanitizerObj = sanitizerObj;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.page_title = "";
        this.serverUrl = "";
        this.UrlAfterLogin = '';
        this.MethodAfterLogin = '';
        this.AppPrefix = 'salahcertified';
        this.TwoFACheckStatus = false;
    }
    AppUtils.prototype.SetServerUrl = function (url) {
        this.serverUrl = url;
    };
    AppUtils.prototype.GetServerUrl = function () {
        return this.serverUrl;
    };
    AppUtils.prototype.AddToLocalStorage = function (key, value) {
        key = this.AppPrefix + +"_" + key;
        window.localStorage[key] = JSON.stringify(value);
    };
    AppUtils.prototype.GetFromLocalStorage = function (key) {
        key = this.AppPrefix + +"_" + key;
        return JSON.parse(window.localStorage[key] || null);
    };
    AppUtils.prototype.TimeStampDifference = function (date1, date2) {
        var diffTimeStamp;
        var difference = date1 / 1000 - date2;
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24;
        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60;
        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;
        var secondsDifference = Math.floor(difference / 1000);
        diffTimeStamp = 'difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ';
        return diffTimeStamp;
    };
    AppUtils.prototype.ShowToast = function (text, pos, delay) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: delay,
            position: pos
        });
        toast.present();
    };
    AppUtils.prototype.SanitizeUrl = function (url) {
        // alert(url);
        return this.sanitizerObj.bypassSecurityTrustUrl(url);
    };
    AppUtils.prototype.CountDownFromDate = function (countDownDate, intervalObj) {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(intervalObj);
            return "EXPIRED";
        }
        else {
            // Display the result in the element with id="demo"
            return days + "D " + hours + "H "
                + minutes + "M " + seconds + "S ";
        }
    };
    AppUtils.prototype.ShowAlert = function (title, msg, button, style) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            cssClass: style,
            buttons: [button]
        });
        alert.present();
    };
    AppUtils.prototype.ShowLoader = function () {
        this.SpinnerObj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_spinner_spinner__["a" /* SpinnerComponent */]);
        this.SpinnerObj.present();
    };
    AppUtils.prototype.HideLoader = function () {
        this.SpinnerObj.dismiss();
    };
    AppUtils = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], AppUtils);
    return AppUtils;
}());

//# sourceMappingURL=apputils.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the FiatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FiatProvider = (function () {
    function FiatProvider(pnkHttpService) {
        this.pnkHttpService = pnkHttpService;
    }
    FiatProvider.prototype.FiatDeposit = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencysend/user_name/" + data, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    FiatProvider.prototype.FiatWithdraw = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencysend/user_name/" + data, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    FiatProvider.prototype.FiatHistory = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencysend/user_name/" + data, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    FiatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__["a" /* PnkHttpService */]])
    ], FiatProvider);
    return FiatProvider;
}());

//# sourceMappingURL=fiat.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CryptoCurrencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CryptoCurrencyPage = (function () {
    function CryptoCurrencyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CryptoCurrencyPage.prototype.ionViewDidLoad = function () {
    };
    CryptoCurrencyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-crypto-currency',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\crypto-currency\crypto-currency.html"*/'<!--ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>CRYPTOCURRENCY</ion-title>\n  </ion-navbar>\n</ion-header-->\n\n\n<ion-content>\n    <!--coin-status></coin-status-->\n    <crypto-currency-dashboard></crypto-currency-dashboard>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\crypto-currency\crypto-currency.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], CryptoCurrencyPage);
    return CryptoCurrencyPage;
}());

//# sourceMappingURL=crypto-currency.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyaddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_copycurrencyaddressmodal_copycurrencyaddressmodal__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_currencytradegraph_currencytradegraph__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the CurrencyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CurrencyaddressPage = (function () {
    function CurrencyaddressPage(auth, navCtrl, navParams, general, cryptoService, appUtils, modalCtrl) {
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.general = general;
        this.cryptoService = cryptoService;
        this.appUtils = appUtils;
        this.modalCtrl = modalCtrl;
        this.cryptocurrencylist = [];
    }
    CurrencyaddressPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.appUtils.ShowLoader();
        this.cryptoService.GetCryptoCurrencyWallets().then(function (res) {
            _this.cryptoService.GetCurrencyAddress().then(function () {
                _this.appUtils.HideLoader();
                _this.cryptocurrencylist = _this.cryptoService.CryptoCurrencies;
                console.log(_this.cryptocurrencylist);
            }, function (error) {
                _this.appUtils.HideLoader();
                console.log(error);
            });
        }, function (error) {
            _this.appUtils.HideLoader();
            _this.appUtils.ShowToast(error, 'bottom', 6000);
        });
    };
    CurrencyaddressPage.prototype.GetCryptoAddresses = function (refresher) {
        var _this = this;
        //this.cryptoService.GetCryptoCurrencyWallets().then((res) => {
        this.cryptoService.GetCurrencyAddress().then(function () {
            _this.cryptocurrencylist = _this.cryptoService.CryptoCurrencies;
            console.log(_this.cryptocurrencylist);
            if (refresher != 0)
                refresher.complete();
        }, function (error) {
            console.log(error);
            if (refresher != 0)
                refresher.complete();
            _this.appUtils.ShowToast(error, 'bottom', 6000);
        });
        // }, (error) => {
        //   if (refresher != 0)
        //     refresher.complete();
        //   this.appUtils.ShowToast(error, top, 6000);
        // });
    };
    CurrencyaddressPage.prototype.CreateAddress = function (currency) {
        var _this = this;
        this.appUtils.ShowLoader();
        this.cryptoService.CreateCurrencyAddress(currency.curr_code).then(function (res) {
            _this.appUtils.HideLoader();
            currency.curr_addr = res;
        }, function (error) {
            _this.appUtils.HideLoader();
            _this.appUtils.ShowToast(error, "bottom", 6000);
        });
    };
    CurrencyaddressPage.prototype.ShowAddress = function (currency) {
        var CurrencyAddressModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__components_copycurrencyaddressmodal_copycurrencyaddressmodal__["a" /* CopycurrencyaddressmodalComponent */], {
            modalData: currency
        });
        CurrencyAddressModal.present();
    };
    CurrencyaddressPage.prototype.ShowCurrencyGraph = function (currency) {
        var CurrencyGraphModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__components_currencytradegraph_currencytradegraph__["a" /* CurrencytradegraphComponent */], {
            modalData: currency
        });
        CurrencyGraphModal.present();
        // this.navCtrl.push(CurrencytradegraphComponent, {modalData:currency})
    };
    CurrencyaddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-currencyaddress',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\currencyaddress\currencyaddress.html"*/'<!--\n  Generated template for the CurrencyaddressPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>CURRENCY ADDRESS</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="GetCryptoAddresses($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-grid>\n    <ng-container *ngIf="cryptocurrencylist.length >0">\n      <ion-row *ngFor="let data of cryptocurrencylist">\n        <ion-card text-center>\n          <ion-item (click)="ShowCurrencyGraph(data)">\n            <ion-avatar item-start >\n              <img [src]="appUtils.SanitizeUrl(appUtils.GetServerUrl()+\'storage/uploads/user_null/\'+data.curr_image)">\n            </ion-avatar>\n            <ion-row>\n              <ion-col> {{data.curr_name}}(\n                <b>{{data.curr_code}}</b>)\n              </ion-col>\n              <!-- <ion-col col-6 text-right>\n                <span *ngIf="data.address_status == \'inactive\'">\n                  Inactive\n                  <ion-icon name="close-circle" style="color:#f53d3d"></ion-icon>\n\n                </span>\n                <span *ngIf="data.address_status == \'active\'">\n                  Activated\n                  <ion-icon name="checkmark-circle" style="color: #32db64"></ion-icon>\n                </span>\n              </ion-col> -->\n            </ion-row>\n\n          </ion-item>\n          <hr/>\n          <ion-card-content>\n            <ion-row>\n              <ion-col col-6>\n                <ion-row>\n                  <ion-col>\n                    <h1>Balance</h1>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col>{{data.available_balance}}</ion-col>\n                </ion-row>\n\n              </ion-col>\n              <ion-col col-6>\n                <button ion-button round small color="valuebitcolor" *ngIf="data.curr_addr == \'\' || data.curr_addr == null" (click)="CreateAddress(data)">Create Address</button>\n                <button ion-button outline small round color="valuebitcolor" *ngIf="data.curr_addr != \'\' && data.curr_addr != null" (click)="ShowAddress(data)">Receive</button>\n              </ion-col>\n            </ion-row>\n\n          </ion-card-content>\n        </ion-card>\n      </ion-row>\n    </ng-container>\n  </ion-grid>\n  <div class="error_msg_style" *ngIf="cryptocurrencylist == null || cryptocurrencylist == \'\'">\n    <h3>No address available.</h3>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\currencyaddress\currencyaddress.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], CurrencyaddressPage);
    return CurrencyaddressPage;
}());

//# sourceMappingURL=currencyaddress.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroductionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entrypage_entrypage__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IntroductionPage = (function () {
    function IntroductionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showStartBtn = false;
    }
    IntroductionPage.prototype.GoToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__entrypage_entrypage__["a" /* EntrypagePage */]);
    };
    IntroductionPage.prototype.slideChanged = function ($event) {
        this.currentIndex = this.slides.getActiveIndex();
        if (this.currentIndex == 3 && $event.swipeDirection == 'next') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__entrypage_entrypage__["a" /* EntrypagePage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], IntroductionPage.prototype, "slides", void 0);
    IntroductionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-introduction',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\introduction\introduction.html"*/'<!--\n  Generated template for the IntroductionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--ion-header>\n\n  <ion-navbar>\n    <ion-title>Introduction</ion-title>\n  </ion-navbar>\n\n</ion-header-->\n\n\n<ion-content>\n  <ion-slides (ionSlideDidChange)="slideChanged($event)" pager="true">\n    <ion-slide>\n      <div class="introSlide">\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Welcome User!</h2>\n        <p>Hello this is testing content for Valuebit App introducton.</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div class="introSlide">\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Valuebit Introduction 1</h2>\n        <p>Hello this is testing content for Valuebit App introducton.</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div class="introSlide">\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Valuebit Introduction 2</h2>\n        <p>Hello this is testing content for Valuebit App introducton.</p>\n      </div>\n    </ion-slide>\n    <!-- <ion-slide>\n      <div>\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Welcome User!</h2>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div>\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Welcome User!</h2>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div>\n        <img src="assets/imgs/logo.png" class="slideImg">\n        <h2>Welcome User!</h2>\n      </div>\n    </ion-slide> -->\n  </ion-slides>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title>\n      <button ion-button outline (click)=\'GoToHome()\' *ngIf="currentIndex != 2">SKIP</button>\n      <button ion-button outline (click)=\'GoToHome()\' *ngIf="currentIndex == 2">FINISH</button>\n    </ion-title>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\introduction\introduction.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], IntroductionPage);
    return IntroductionPage;
}());

//# sourceMappingURL=introduction.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_two_step_verification_two_step_verification__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_changepin_changepin__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.GoToTowFA = function () {
        var twoFaModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_two_step_verification_two_step_verification__["a" /* TwoStepVerificationComponent */], {
            modalData: ""
        });
        twoFaModal.present();
    };
    SettingsPage.prototype.GoToChangePin = function () {
        var ChangePinModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_changepin_changepin__["a" /* ChangepinComponent */], {
            modalData: ""
        });
        ChangePinModal.present();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ACCOUNT SETTINGS</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="centerItem">\n    <ion-card class="settingCard" (click)="GoToTowFA()">\n      <div style="padding: 10px">\n        <ion-icon name="checkmark-circle" class="settingIcon"></ion-icon>\n      </div>\n      <ion-card-content>\n        <h1>2-step Verification setting</h1>\n      </ion-card-content>\n    </ion-card>\n    <ion-card class="settingCard" (click)="GoToChangePin()">\n      <div style="padding: 10px">\n        <!-- <ion-icon name="ios-more" class="settingIcon"></ion-icon> -->\n        <ion-icon name="ios-more" class="settingIcon"></ion-icon>\n      </div>\n      <ion-card-content>\n        <h1>Change Pin</h1>\n      </ion-card-content>\n    </ion-card>\n\n  </div>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_modal_modal__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_spinner_spinner__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(326);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthenticateProvider = (function () {
    function AuthenticateProvider(modalCtrl, toastCtrl, pnkHttpService, camera, transfer, file, filePath, actionSheetCtrl, platform, loadingCtrl) {
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.pnkHttpService = pnkHttpService;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.userImageLink = "";
        this.toastMsg = '';
        this.toastTimeOut = 3000;
        this.userFourDigitPin = '';
        this.userPinSetStatus = false;
        this.disableForm = false;
        this.userData = null;
        this.loggedIn = false;
        this.uploadImagePath = null;
        this.twoSFPassVerificationStatus = false;
        this.lastImage = null;
        this.TwoFACheckStatus = false;
        //this.userImageLink         = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
    }
    AuthenticateProvider.prototype.checkUserName = function (username) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("usercheckunique/user_name/" + username, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.checkEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("usercheckunique/user_email/" + email, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.getUserData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("userprofiledetails", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userprofiledata.rows.length > 0) {
                            _this.userprofiledata = response.userprofiledata.rows[0];
                        }
                        else {
                            reject("No data found");
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.ProfileUpdate = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("userprofiledetails", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userprofileupdated.value == 'SUCCESS') {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.Register = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("usersignup", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.registerstatus.value == 'SUCCESS') {
                            _this.temp = null;
                            _this.temp = response.activationkeymessege.value;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.Login = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("login", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userloginstatus.value == "SUCCESS") {
                            _this.setToken(response.valuebit_token.value);
                            //this.valuebit_token = response.valuebit_token.value;
                            _this.userLoginStatus = response.userloginstatus.value;
                            _this.twoFactorMode = response.twofactormode.value;
                            _this.twoFactorStatus = response.twofactorstatus.value;
                            _this.userData = response.userdata;
                            localStorage.setItem('userData', JSON.stringify(_this.userData));
                            if (response.userdata.userfourdigitpinstatus == 1) {
                                _this.userPinSetStatus = true;
                            }
                            else {
                                _this.userPinSetStatus = false;
                            }
                            if (localStorage.getItem('userData')) {
                                var userName = localStorage.getItem('userData');
                                userName = JSON.parse(userName);
                                userName = userName.user_name;
                                // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                            }
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.ResetPasswordByEmail = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("userresetpassword", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.forgotpassword.value == "SUCCESS") {
                            _this.toastMsg = response.emailsent.value;
                        }
                        else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.pinVerification = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ///alert("USerData:"+ this.userData.userfourdigitpinstatus)
            if (_this.userData.userfourdigitpinstatus == 1) {
                _this.pnkHttpService.PostSynchronousAjaxFromServer("apppinverification", val).subscribe(function (response) {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.userfourdigitpin.value == "SUCCESS") {
                                //if (localStorage.getItem('userData')) {
                                if (_this.userData) {
                                    // let userName: any = localStorage.getItem('userData');
                                    // userName = JSON.parse(userName);
                                    var userName = _this.userData.user_name;
                                    // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                                }
                            }
                            else {
                                reject(response.FailureReason.value);
                            }
                        }
                        else {
                            _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                        resolve(0);
                    }
                    else {
                        _this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, function (error) {
                    reject(error);
                });
            }
            else {
                _this.pnkHttpService.PutSynchronousAjaxFromServer("apppinverification", val).subscribe(function (response) {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.userfourdigitpin.value == "SUCCESS") {
                                if (localStorage.getItem('userData')) {
                                    var userName = localStorage.getItem('userData');
                                    userName = JSON.parse(userName);
                                    userName = userName.user_name;
                                    // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                                }
                            }
                            else {
                                reject(response.FailureReason.value);
                            }
                        }
                        else {
                            _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                        resolve(0);
                    }
                    else {
                        _this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, function (error) {
                    reject("Connection not found");
                });
            }
        });
    };
    AuthenticateProvider.prototype.pinSet = function (val) {
        var _this = this;
        //  alert("sdsddd:"+ this.userData.userfourdigitpinstatus)
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("apppinverification", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userfourdigitpinstatus.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.twoStepVerification = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/manual", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    console.log("TwoFAResponse::" + JSON.stringify(response, null, 4));
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.verifytwofactorcode.value == "SUCCESS") {
                            resolve(response.verifytwofactorcode.successmessege);
                        }
                        else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    // resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.twoSFPasswordVerify = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("twofactorauthentication/manual", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twofactorcodeauthorisation.value == "SUCCESS") {
                            // this.toastMsg = response.twofactorcodeauthorisation.successmessege;
                            // this.toastDesignClass = "success";
                            // this.toast();
                            _this.twoFactorMode = 'disabled';
                            resolve(response.twofactorcodeauthorisation.successmessege);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    // resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.twoSFPasswordDisable = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (data != undefined)
                _this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/disable", data).subscribe(function (response) {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.disabletwofactorcode != undefined) {
                                if (response.disabletwofactorcode.value == "SUCCESS") {
                                    resolve(response.disabletwofactorcode.successmessege);
                                }
                                else {
                                    reject(response.FailureReason.value);
                                }
                            }
                        }
                        else {
                            _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                    }
                    else {
                        _this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, function (error) {
                    reject('Unable to Connect To Internet');
                });
        });
    };
    AuthenticateProvider.prototype.postBankDetails = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("userbankdetails", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userbankdata.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.getBankDetails = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("userbankdetails", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userbankdata.rows.length > 0) {
                            _this.bankDetails = response.userbankdata.rows;
                        }
                        else {
                            reject('no data available');
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.GetKycDetails = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("userkycdetails", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userkycdata.rows.length > 0) {
                            console.log(response.userkycdata.rows);
                            _this.userKycData = response.userkycdata.rows[0];
                        }
                        else {
                            if (response.FailureReason != undefined)
                                reject(response.FailureReason.value);
                            else
                                reject("No Kyc details availbale till now.");
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.postKycDetails = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("userkycdetails", val).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userkycdata.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.kycDetails = function (val) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/disabled/" + val, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.disabletwofactorcode.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    // bankDetails() {
    //     return new Promise((resolve, reject) => {
    //         this.pnkHttpService.PutSynchronousAjaxFromServer("userbankdata", '').subscribe(response => {
    //             if ((response) && (typeof response) != "string") {
    //                 if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
    //                     if (response.userbankdata.rows > 0) {
    //                         // this.userbankdata = response.userbankdata.rows
    //                     } else {
    //                         reject('no data available');
    //                     }
    //                 }
    //                 else {
    //                     this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
    //                     reject(0);
    //                 }
    //                 resolve(0);
    //             }
    //             else {
    //                 this.pnkHttpService.ParseError();
    //                 reject(1);
    //             }
    //         }, error => {
    //             reject('Unable to Connect To Internet');
    //         })
    //     });
    // }
    AuthenticateProvider.prototype.appInit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("appinit", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userloginstatus.value == "SUCCESS") {
                            _this.valuebit_token = response.valuebit_token.value;
                            _this.userLoginStatus = response.userloginstatus.value;
                            _this.twoFactorMode = response.twofactormode.value;
                            _this.twoFactorStatus = response.twofactorstatus.value;
                            _this.userData = response.userdata;
                            _this.setToken(response.valuebit_token.value);
                            localStorage.setItem('userData', JSON.stringify(_this.userData));
                            if (response.userdata.userfourdigitpinstatus == 1) {
                                _this.userPinSetStatus = true;
                            }
                            else {
                                _this.userPinSetStatus = false;
                            }
                        }
                        else {
                            _this.setToken(null);
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.UploadUserImage = function (imgType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY, imgType).then(function (res) {
                                resolve(res);
                            }, function (error) {
                                _this.presentToast(error);
                            });
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.CAMERA, imgType).then(function () {
                                resolve();
                            }, function (error) {
                                _this.presentToast('An error occured.');
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            resolve();
                        }
                    }
                ]
            });
            actionSheet.present();
        });
    };
    AuthenticateProvider.prototype.takePicture = function (sourceType, imgType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                quality: 100,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            _this.camera.getPicture(options).then(function (imagePath) {
                if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                    _this.filePath.resolveNativePath(imagePath)
                        .then(function (filePath) {
                        var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), imgType).then(function (imgRes) {
                            resolve(imgRes);
                        });
                    });
                }
                else {
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), imgType).then(function (imgRes) {
                        resolve(imgRes);
                    });
                }
            }, function (err) {
                //this.presentToast('Error while selecting image.');
                reject(err);
            });
        });
    };
    AuthenticateProvider.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    AuthenticateProvider.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, imgType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
                _this.lastImage = newFileName;
                _this.uploadImage(imgType).then(function (imgUploadRes) {
                    resolve(imgUploadRes);
                });
            }, function (error) {
                //this.presentToast('Error while storing file.');
                reject(error);
            });
        });
    };
    AuthenticateProvider.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    AuthenticateProvider.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    AuthenticateProvider.prototype.uploadImage = function (imgType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.uploadImagePath = null;
            var url;
            if (imgType)
                url = _this.pnkHttpService.ServicesUrl + "useruploadimage/" + _this.userData.user_name + "/" + imgType;
            else
                url = _this.pnkHttpService.ServicesUrl + "useruploadimage/" + _this.userData.user_name;
            var targetPath = _this.pathForImage(_this.lastImage);
            var filename = _this.lastImage;
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': filename }
            };
            var fileTransfer = _this.transfer.create();
            _this.loading = _this.loadingCtrl.create({
                content: 'Uploading...',
            });
            _this.loading.present();
            //alert('targetPath'+targetPath+', url'+ url+', options'+ options);
            fileTransfer.upload(targetPath, url, options).then(function (data) {
                //alert(JSON.stringify(data,null,4));
                _this.loading.dismissAll();
                var tempData;
                try {
                    tempData = JSON.parse(data.response);
                }
                catch (e) {
                    _this.presentToast("Error: " + e);
                }
                if (tempData.uploadstatus == 'SUCCESS') {
                    _this.presentToast('Image successfully uploaded.');
                    _this.tempImagePath = targetPath;
                    _this.imgName = filename;
                    _this.uploadImagePath = _this.imgName;
                    resolve(_this.imgName);
                    //this.backHardwareBtn();
                    //this.homeService.userProfile.user_image = this.homeService.tempImagePath + ''+this.imgName;
                    //this.rForm.value.fupUserImage = this.imgName;
                }
                else {
                    //this.presentToast(tempData.FailureReason);
                    reject(tempData.FailureReason);
                }
            }, function (err) {
                //alert(JSON.stringify(err,null,4));
                _this.loading.dismissAll();
                //this.backHardwareBtn();
                //this.presentToast('Error while uploading file.');
                reject(err);
            });
        });
    };
    AuthenticateProvider.prototype.toast = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: this.toastMsg,
            duration: this.toastTimeOut,
            dismissOnPageChange: true,
            cssClass: this.toastDesignClass,
            position: 'top'
        });
        setTimeout(function () {
            _this.disableForm = false;
            _this.toastMsg = '';
            _this.toastDesignClass = '';
        }, this.toastTimeOut);
        toast.present();
    };
    AuthenticateProvider.prototype.twoSFVerify = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("twosfverify", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {
                            _this.twoFactorMode = response.twofactormode.value;
                            _this.twoFactorStatus = response.twofactorstatus.value;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.userProfileDetails = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("userprofiledetails", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.userProfileDetailsUpdate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("userprofiledetails", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider.prototype.modal = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_modal_modal__["a" /* ModalComponent */], {
            modalData: this.modalData,
            twostepStatus: this.twoFactorMode
        });
        profileModal.present();
    };
    AuthenticateProvider.prototype.spinner = function () {
        /*this.backHardwareBtn = this.platform.registerBackButtonAction(() => {

        });*/
        this.spinnerEnable = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_spinner_spinner__["a" /* SpinnerComponent */]);
        this.spinnerEnable.present();
    };
    AuthenticateProvider.prototype.setToken = function (token) {
        this.pnkHttpService.token = token;
        this.valuebit_token = token;
        localStorage.setItem('token', token);
    };
    AuthenticateProvider.prototype.ChangePin = function (pinSet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PutSynchronousAjaxFromServer("apppin/changeapppin", pinSet).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.apppinchangedstatus.value == "SUCCESS") {
                            resolve('success');
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    AuthenticateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */]])
    ], AuthenticateProvider);
    return AuthenticateProvider;
}());

//# sourceMappingURL=authenticate.js.map

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/crypto-currency/crypto-currency.module": [
		726,
		9
	],
	"../pages/currencyaddress/currencyaddress.module": [
		730,
		8
	],
	"../pages/dashboard/dashboard.module": [
		727,
		7
	],
	"../pages/entrypage/entrypage.module": [
		733,
		6
	],
	"../pages/fiat-currency/fiat-currency.module": [
		728,
		5
	],
	"../pages/fiat-navigation/fiat-navigation.module": [
		729,
		4
	],
	"../pages/introduction/introduction.module": [
		731,
		3
	],
	"../pages/settings/settings.module": [
		734,
		2
	],
	"../pages/splash/splash.module": [
		732,
		1
	],
	"../pages/wallet/wallet.module": [
		735,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 225;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptocurrencyProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the CryptocurrencyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CryptocurrencyProvider = (function () {
    function CryptocurrencyProvider(pnkHttpService, http) {
        this.pnkHttpService = pnkHttpService;
        this.http = http;
        this.CryptoHistoryList = { sendCurrency: null, buyCurrency: null, sellCurrency: null, receiveCurrency: null, currencyexchange: null };
    }
    CryptocurrencyProvider.prototype.CryptoBuy = function (data, currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("currencybuy/" + currency, data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        console.log("buyData:::" + JSON.stringify(response, null, 4));
                        // if (response.cryptocurrencyliststatus.value == "SUCCESS") {
                        //   this.CryptoCurrencies = response.cryptocurrencylist.rows;
                        // }
                        // else {
                        //   reject(response.FailureReason.value);
                        // }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoExchange = function (data, currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("currencyexchange/" + currency, data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        console.log("buyData:::" + JSON.stringify(response, null, 4));
                        if (response.currencytxs.value == "SUCCESS") {
                            resolve(response);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoExchangeToAddress = function (data, currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("currencyexchangetoaddress/" + currency, data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        console.log("ExchangeData:::" + JSON.stringify(response, null, 4));
                        if (response.currencyexchange.value == "SUCCESS") {
                            if (response.cryptocurrencylist != undefined)
                                _this.CryptoCurrencies = response.cryptocurrencylist.rows;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoSell = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencysend/user_name/" + data, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoSend = function (data, currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("currencysend/" + currency, data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.currencytxs.value == "SUCCESS") {
                            resolve(JSON.stringify(response.currencytxs.transaction_obj));
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoSendTransactionObj = function (data, currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("currencysendtoaddress/" + currency, data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.currencysend.value == "SUCCESS") {
                            resolve(response.currencysend.success_message);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    // resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CryptoHistory = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencyhistory/" + data, '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.currencyhistorystatus.value == "SUCCESS") {
                            if (response.currencysend)
                                _this.CryptoHistoryList.sendCurrency = response.currencysend.rows;
                            if (response.currencybuy)
                                _this.CryptoHistoryList.buyCurrency = response.currencybuy.rows;
                            if (response.currencysell != undefined)
                                _this.CryptoHistoryList.sellCurrency = response.currencysell.rows;
                            if (response.currencyreceive != undefined)
                                _this.CryptoHistoryList.receiveCurrency = response.currencyreceive.rows;
                            if (response.currencyexchange != undefined)
                                _this.CryptoHistoryList.currencyexchange = response.currencyexchange.rows;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                        resolve(0);
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.GetCurrencyAddress = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("getcryptocurrency/wallet/address", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.cryptocurrencyliststatus.value == "SUCCESS") {
                            if (response.cryptowalletaddress.rows.length > 0) {
                                // this.cryptocurrencylist = response.cryptowalletaddress.rows;
                                _this.CryptoCurrencies = response.cryptowalletaddress.rows;
                            }
                            else {
                                reject('no data available');
                            }
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.GetCryptoCurrencies = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.pnkHttpService.HttpRequestDone = false;
            _this.pnkHttpService.GetAjaxFromServer("getcryptocurrency", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.cryptocurrencyliststatus.value == "SUCCESS") {
                            if (response.cryptocurrencylist.rows.length > 0) {
                                _this.CryptoCurrencies = response.cryptocurrencylist.rows;
                            }
                            else {
                                reject('notdata');
                            }
                        }
                        else {
                            reject(response.FailureReason.value);
                            // this.pnkHttpService.HttpRequestDone = true;
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                        // this.pnkHttpService.HttpRequestDone = true;
                    }
                    resolve(0);
                    // this.pnkHttpService.HttpRequestDone = true;
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                    // this.pnkHttpService.HttpRequestDone = true;
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
                // this.pnkHttpService.HttpRequestDone = true;
            });
        });
    };
    CryptocurrencyProvider.prototype.GetCryptoCurrencyWallets = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.HttpRequestDone = false;
            _this.pnkHttpService.GetAjaxFromServer("getcryptocurrency/wallet", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    // alert("status::" + response.cryptocurrencyliststatus.value);
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.cryptowalletbalance.value == "SUCCESS") {
                            // console.log("CryptoData:::" + JSON.stringify(response.cryptocurrencylist, null, 4));
                            // if (response.cryptocurrencylist.rows.lenght > 0) {
                            //   // alert(response.cryptocurrencylist.rows.lenght);
                            //   this.CryptoCurrencies = response.cryptocurrencylist.rows;
                            // }
                            // else {
                            //   reject('No data found');
                            // }
                        }
                        else {
                            reject(response.FailureReason.value);
                            _this.pnkHttpService.HttpRequestDone = true;
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                        _this.pnkHttpService.HttpRequestDone = true;
                    }
                    resolve(0);
                    _this.pnkHttpService.HttpRequestDone = true;
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                    _this.pnkHttpService.HttpRequestDone = true;
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
                _this.pnkHttpService.HttpRequestDone = true;
            });
        });
    };
    CryptocurrencyProvider.prototype.CurrencyConversion = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("gettotalamountdetails", data).subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        // console.log("ConversionData::"+JSON.stringify(response,null,4));
                        if (response.amountdetailsstatus.value == "SUCCESS") {
                            resolve(response);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CreateCurrencyAddress = function (currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer(currency + "/userscurrency", "").subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        console.log("ConversionData::" + JSON.stringify(response, null, 4));
                        if (response.generateaddressstatus.value == "SUCCESS") {
                            resolve(response.currencyaddress.value);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.CurrencyLivePrice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServerWithoutAuth("currencyliveprice", "").subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        // console.log("ConversionData::"+JSON.stringify(response,null,4));
                        if (response.cryptocurrencyliststatus.value == "SUCCESS") {
                            resolve(response.cryptocurrencylist.rows);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider.prototype.GetCurrencyConversionList = function (currency) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("currencyexchangeconversion/" + currency, "").subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        // console.log("ConversionData::"+JSON.stringify(response,null,4));
                        if (response.currencyexchangeconversion.value == "SUCCESS") {
                            resolve(response.convertedexchangeamount.value);
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    CryptocurrencyProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], CryptocurrencyProvider);
    return CryptocurrencyProvider;
}());

//# sourceMappingURL=cryptocurrency.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PnkHttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PnkHttpService = (function () {
    function PnkHttpService(http, jsonp, appUtils) {
        this.http = http;
        this.jsonp = jsonp;
        this.appUtils = appUtils;
        this.curUrl = window.location.href;
        this.timest = Math.round(new Date().getTime());
        this.token = null;
        this.AppSecretKey = "";
        this.HttpRequestDone = true;
        this.AssetsUrl = "http://exchange.finelogix.com/";
        this.ParseError = function () {
        };
        this.HandlePinakaError = function (pinakaResp) {
            console.log("Pinaka Error: Oops! Something went wrong. Please try again later");
        };
        //this.AssetsUrl = " http://ilhaus.com/dev/valuebit/";
        this.ServerUrl = "";
        /*****Live ForAppBuild*/
        // this.ServerUrl = 'http://ilhaus.com/dev/valuebit/'//Uncomment for live
        this.ServerUrl = "http://exchange.finelogix.com/";
        this.ServicesUrl = this.ServerUrl + "api/app/"; // uncomment for Live N dont forget to remove proxy form ionic config
        /****Local */
        //this.ServerUrl = "http://exchange.finelogix.com/"; //Uncomment for live
        // this.ServerUrl = "http://192.168.1.37/laravel/valuebit-new/api/app/";   
        // this.ServicesUrl = this.ServerUrl+"api/";  ///uncomment for local server and local browser
        this.appUtils.SetServerUrl(this.AssetsUrl);
    }
    PnkHttpService.prototype.CreateAuthorizationHeader = function (headers) {
        headers.append('X-CallBack-Type', 'AJAXGET');
        headers.append('X-Project-Type', 'APP');
        headers.append('X-Secret-Key', 'abc01');
        headers.append('XAUTHTOKEN', this.token);
    };
    PnkHttpService.prototype.CreateAuthorizationHeaderForRawLogin = function (headers) {
        headers.append('X-CallBack-Type', 'AJAXGET');
        headers.append('X-Project-Type', 'APP');
        headers.append('X-Secret-Key', 'abc01');
    };
    PnkHttpService.prototype.GetAjax = function (url, paramString) {
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url;
        else
            url = this.ServicesUrl + url + "?" + paramString;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.GetAjaxFromServer = function (url, paramString) {
        var commData = "t=" + Math.round(new Date().getTime());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeader(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url + "?" + commData;
        else
            url = this.ServicesUrl + url + "?" + paramString + "&" + commData;
        return this.http.get(url, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.GetAjaxFromServerWithoutAuth = function (url, paramString) {
        var commData = "t=" + Math.round(new Date().getTime());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeaderForRawLogin(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url;
        else
            url = this.ServicesUrl + url + "?" + paramString;
        return this.http.get(url, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.PostSynchronousAjaxFromServer = function (url, paramString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeader(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url;
        else
            url = this.ServicesUrl + url;
        return this.http.post(url, { "requestData": paramString }, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.PostSynchronousAjaxFromServerForRawLogin = function (url, paramString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeaderForRawLogin(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url;
        else
            url = this.ServicesUrl + url;
        return this.http.post(url, { "requestData": paramString }, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.PostSynchronousAjaxFromServerWithoutAuth = function (url, paramString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeaderForRawLogin(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url;
        else
            url = this.ServicesUrl + url;
        return this.http.post(url, { "requestData": paramString }, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.PutSynchronousAjaxFromServer = function (url, paramString) {
        var commData = "t=" + Math.round(new Date().getTime());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeader(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url + "?" + commData;
        else
            url = this.ServicesUrl + url + "?" + commData;
        return this.http.put(url, { "requestData": paramString }, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.DeleteSynchronousAjaxFromServer = function (url, paramString) {
        var commData = "&t=" + Math.round(new Date().getTime());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.CreateAuthorizationHeader(headers);
        if ((paramString == null) || (paramString == "") || (paramString == undefined))
            url = this.ServicesUrl + url + "?" + commData;
        else
            url = this.ServicesUrl + url + "?" + commData;
        return this.http.delete(url, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    PnkHttpService.prototype.extractData = function (res) {
        var resp;
        resp = res;
        resp = resp._body.replace(/<script.*?>.*?<\/script>/igm, '');
        var body = JSON.parse(resp);
        return body;
    };
    PnkHttpService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    PnkHttpService.prototype.GetJsonpFromHttp = function (url) {
        return this.http.get(url)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    PnkHttpService.prototype.GetJsonp = function (url) {
        return this.jsonp.get(url)
            .map(function (response) { return response.json()[1]; }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error);
        });
    };
    PnkHttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */], __WEBPACK_IMPORTED_MODULE_5__apputils_apputils__["a" /* AppUtils */]])
    ], PnkHttpService);
    return PnkHttpService;
}());

//# sourceMappingURL=pnk-http.service.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_controller__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__two_step_verification_two_step_verification__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ModalComponent = (function () {
    function ModalComponent(navCtrl, params, viewCtrl, appUtils) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.appUtils = appUtils;
        this.modalData = params.get('modalData');
        this.twostepStatus = params.get('twostepStatus');
    }
    ModalComponent.prototype.changeStatus = function (val) {
        var _this = this;
        if (val == 'disabled') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__two_step_verification_two_step_verification__["a" /* TwoStepVerificationComponent */]).then(function () {
                _this.viewCtrl.dismiss();
            });
        }
        else if (val == 'enabled') {
        }
    };
    ModalComponent.prototype.dismiss = function () {
        this.appUtils.TwoFACheckStatus = true;
        this.viewCtrl.dismiss();
    };
    ModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'modal',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\modal\modal.html"*/'<ion-content class="modalIonContet">\n  <div class="outterMostDiv">\n    <ion-card class="modalCard">\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col>\n                <ion-title>{{modalData}}</ion-title>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-grid>\n            <ion-row>\n              <ion-col *ngIf="twostepStatus == \'disabled\'">\n                  <button ion-button round outline type="button" (click)="changeStatus(\'disabled\')">Enable</button>\n                  <button ion-button round outline type="button" (click)="dismiss()">Close</button>\n              </ion-col>\n              <ion-col *ngIf="twostepStatus == \'enabled\'">\n                  <button ion-button round outline type="button" (click)="changeStatus(\'enabled\')">Enable</button>\n                  <button ion-button round outline type="button" (click)="dismiss()">Close</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n      </ion-card>\n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\modal\modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__["a" /* AppUtils */]])
    ], ModalComponent);
    return ModalComponent;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencytradegraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CurrencytradegraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CurrencytradegraphComponent = (function () {
    function CurrencytradegraphComponent(params, appUtils, viewCtrl) {
        this.params = params;
        this.appUtils = appUtils;
        this.viewCtrl = viewCtrl;
        console.log('Hello CurrencytradegraphComponent Component');
        this.modalData = this.params.get('modalData');
        this.segmentData = '0';
        this.title = this.modalData.curr_code;
    }
    CurrencytradegraphComponent.prototype.SelectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    CurrencytradegraphComponent.prototype.ionViewDidLoad = function () {
        document.getElementById('chart').classList.add('segment-activated');
    };
    CurrencytradegraphComponent.prototype.ChangeSlide = function ($event) {
        // alert($event);
        this.segmentData = $event._snapIndex.toString();
    };
    CurrencytradegraphComponent.prototype.CloseModal = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('graphSlide'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Slides */])
    ], CurrencytradegraphComponent.prototype, "slider", void 0);
    CurrencytradegraphComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'currencytradegraph',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\currencytradegraph\currencytradegraph.html"*/'<!-- Generated template for the CurrencytradegraphComponent component -->\n<ion-header>\n  <!-- <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title class="navbarAppHead">\n            DASHBOARD\n        </ion-title>\n    </ion-navbar> -->\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n    <!-- <ion-icon name="close" (click)="CloseModal();" end></ion-icon> -->\n    <!-- <ion-buttons>\n      <ion-button end>\n        <ion-icon name="close" (click)="CloseModal();"></ion-icon>\n      </ion-button>\n    </ion-buttons> -->\n    <ion-buttons end>\n      <button ion-button clear color="light" (click)="CloseModal()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-segment [(ngModel)]="segmentData" color="dark">\n    <ion-segment-button value="0" (click)="SelectedTab(0)" id="chart" style="height: 55px;">\n      <ion-icon name="md-trending-up" style="line-height: 3rem;"></ion-icon>\n      <span style="margin-top: -20px !important; display: block">\n        Chart\n      </span>\n    </ion-segment-button>\n    <ion-segment-button value="1" (click)="SelectedTab(1)" id="trade" style="height: 55px;">\n      <ion-icon name="ios-snow" style="line-height: 3rem;"></ion-icon>\n      <span style="margin-top: -20px !important; display: block">\n        Trade\n      </span>\n    </ion-segment-button>\n\n    <ion-segment-button value="2" (click)="SelectedTab(2)" id="openOrder" style="height: 55px;">\n      <ion-icon name="cube" style="line-height: 3rem;"></ion-icon>\n      <span style="margin-top: -20px !important; display: block">\n        Open Order\n      </span>\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n<ion-content>\n  <ion-slides (ionSlideWillChange)="ChangeSlide($event)" #graphSlide>\n    <ion-slide>\n      <chart [currName]="modalData.curr_code"></chart>\n    </ion-slide>\n    <ion-slide>\n      <crypto-currency-exchange [currency]="modalData"></crypto-currency-exchange>\n    </ion-slide>\n    <ion-slide>\n        No data available\n    </ion-slide>\n  </ion-slides>\n  <!-- <div [ngSwitch]="segmentData">\n    <div *ngSwitchCase="0">\n      <div id="currencyGraphDiv" style="height: 500px;">\n\n      </div>\n    </div>\n    <div *ngSwitchCase="1">\n      Hello this is graphp modal 2\n    </div>\n    <div *ngSwitchCase="2">\n      Hello this is graphp modal 3\n    </div>\n  </div> -->\n\n\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\currencytradegraph\currencytradegraph.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ViewController */]])
    ], CurrencytradegraphComponent);
    return CurrencytradegraphComponent;
}());

//# sourceMappingURL=currencytradegraph.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangepinComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChangepinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ChangepinComponent = (function () {
    function ChangepinComponent(formBuilder, appUtils, auth, viewCtrl) {
        this.formBuilder = formBuilder;
        this.appUtils = appUtils;
        this.auth = auth;
        this.viewCtrl = viewCtrl;
        console.log('Hello ChangepinComponent Component');
        this.changePinForm = this.formBuilder.group({
            txtNewAppInitPin: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[1-9][0-9]*$')])],
            txtOldAppInitPin: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[1-9][0-9]*$')])],
        });
    }
    ChangepinComponent.prototype.getValue = function ($event) {
        if ($event.target.value.length == 4) {
        }
        else if ($event.target.value.length > 4) {
            this.appUtils.ShowToast("Please Enter only four digt pin", "bottom", 6000);
        }
    };
    ChangepinComponent.prototype.ChangePin = function () {
        var _this = this;
        if (this.changePinForm.valid) {
            this.appUtils.ShowLoader();
            this.auth.ChangePin(this.changePinForm.value).then(function (res) {
                _this.appUtils.HideLoader();
                _this.appUtils.ShowToast("App Pin changed successfully.", "bottom", 6000);
                _this.CloseModal();
            }, function (error) {
                _this.appUtils.HideLoader();
                _this.appUtils.ShowToast(error, 'bottom', 6000);
            });
        }
        else {
            this.appUtils.ShowToast("Please enter valid pins", 'bottom', 6000);
        }
    };
    ChangepinComponent.prototype.CloseModal = function () {
        this.viewCtrl.dismiss();
    };
    ChangepinComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'changepin',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\changepin\changepin.html"*/'<!-- Generated template for the ChangepinComponent component -->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>CHANGE PIN</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="CloseModal()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <div class="centerItem">\n    <form [formGroup]="changePinForm">\n      <ion-item class="formInput">\n        <ion-label>\n          <!-- <ion-icon class="IonIcon" name="md-person"></ion-icon> -->\n          Old Pin\n        </ion-label>\n        <ion-input type="number" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" maxlength="4" placeholder="xxxx" #oldpin id="oldpin"\n          autofocus formControlName="txtOldAppInitPin"></ion-input>\n      </ion-item>\n\n      <ion-item class="formInput">\n        <ion-label>\n          <!-- <ion-icon class="IonIcon" name="md-person"></ion-icon> -->\n          New Pin\n        </ion-label>\n        <ion-input type="number" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" maxlength="4" placeholder="xxxx" #newpin id="newpin"\n          formControlName="txtNewAppInitPin"></ion-input>\n      </ion-item>\n\n\n    </form>\n    <div no-padding style="text-align: center">\n      <button type="button" (click)="ChangePin()" ion-button round outline class="customBtn profileBtn">Change</button>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\changepin\changepin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ViewController */]])
    ], ChangepinComponent);
    return ChangepinComponent;
}());

//# sourceMappingURL=changepin.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GeneralProvider = (function () {
    function GeneralProvider(http, pnkHttpService, toastCtrl, appUtils) {
        this.http = http;
        this.pnkHttpService = pnkHttpService;
        this.toastCtrl = toastCtrl;
        this.appUtils = appUtils;
        this.liveData = [];
        this.countryData = [];
        this.country = 'INR';
        this.toastMsg = '';
        this.toastTimeOut = 3000;
        this.disableForm = false;
        this.countrylink = this.appUtils.GetServerUrl() + 'public/images/flags/';
    }
    GeneralProvider.prototype.SaveContactUs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.PostSynchronousAjaxFromServer("contact-us", '').subscribe(function (response) {
                if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                    if (response.enquirystatus.value == 'SUCCESS') {
                        _this.succussres = response.enquirystatus.success_message;
                        resolve(response.enquirystatus.success_message);
                    }
                    else {
                        reject(response.enquirystatus.FailureReason.value);
                    }
                }
                else {
                    {
                        _this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }
                console.log("into provider resoponse");
            });
        });
    };
    GeneralProvider.prototype.toast = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: this.toastMsg,
            duration: this.toastTimeOut,
            dismissOnPageChange: true,
            cssClass: this.toastDesignClass,
            position: 'top'
        });
        setTimeout(function () {
            _this.disableForm = false;
            _this.toastMsg = '';
            _this.toastDesignClass = '';
        }, this.toastTimeOut);
        toast.present();
    };
    GeneralProvider.prototype.LiveCurrencyValue = function (currencies) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var endpoint = 'live';
            var access_key = '91efc2b4be3e52a88e930a3965007e48';
            // this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH,DOGE&tsyms=' + this.country).subscribe(data => {
            _this.http.get('http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + currencies).subscribe(function (data) {
                resolve(data.quotes);
            }, function (error) {
                reject(error);
            });
        });
    };
    GeneralProvider.prototype.getCountryData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pnkHttpService.GetAjaxFromServer("countrydata", '').subscribe(function (response) {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.countrydata.rows.length > 0) {
                            _this.countryData = response.countrydata.rows;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        _this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    _this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, function (error) {
                reject('Unable to Connect To Internet');
            });
        });
    };
    GeneralProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__apputils_apputils__["a" /* AppUtils */]])
    ], GeneralProvider);
    return GeneralProvider;
}());

//# sourceMappingURL=general.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProfileComponent = (function () {
    function ProfileComponent(general, alertCtrl, formBuilder, events, auth, pnkHttpService, navCtrl, appUtils) {
        var _this = this;
        this.general = general;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.events = events;
        this.auth = auth;
        this.pnkHttpService = pnkHttpService;
        this.navCtrl = navCtrl;
        this.appUtils = appUtils;
        this.countryData = [];
        events.subscribe('imageUpload:successful', function (imageUpload, component) {
            _this.afterImageUpload(imageUpload, component);
        });
        this.userProfile = this.formBuilder.group({
            Email: [this.auth.userData.user_email, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserFirstName: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserLastName: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserDob: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserGender: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            numUserPhone: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserAddress: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            txtUserState: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            numUserPostalCode: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            ddlUserCountry: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
            fupUserProfile: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].requiredTrue],
        });
    }
    ProfileComponent.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.countryData = this.general.countryData;
        this.username = this.auth.userData.user_name;
        //alert(this.countryData.length);
        this.appUtils.ShowLoader();
        this.auth.getUserData().then(function () {
            _this.appUtils.HideLoader();
            _this.userProfile.patchValue({
                Email: _this.auth.userData.user_email,
                txtUserFirstName: _this.auth.userprofiledata.user_fname,
                txtUserLastName: _this.auth.userprofiledata.user_lname,
                txtUserDob: _this.auth.userprofiledata.user_dob,
                txtUserGender: _this.auth.userprofiledata.user_gender,
                numUserPhone: _this.auth.userprofiledata.user_contact,
                txtUserAddress: _this.auth.userprofiledata.user_address,
                txtUserState: _this.auth.userprofiledata.user_state,
                numUserPostalCode: _this.auth.userprofiledata.user_postal_code,
                ddlUserCountry: _this.auth.userprofiledata.user_country_id,
                fupUserProfile: _this.auth.userData.user_image,
            });
        }, function (error) {
            _this.appUtils.HideLoader();
            _this.appUtils.ShowToast(error, 'bottom', 6000);
        });
        //this.getCountryData();
        // console.log(this.userProfile.value.Email);
    };
    ProfileComponent.prototype.profileUpdateForm = function (formValue) {
        var _this = this;
        console.log("kamal" + formValue);
        //  return true;
        this.auth.ProfileUpdate(formValue).then(function () {
            _this.auth.toastDesignClass = 'success';
            _this.auth.toastMsg = "Profile Updated";
            _this.auth.toast();
            _this.auth.userData.user_image = _this.userProfile.value.fupUserProfile;
        }, function (error) {
            alert(JSON.stringify(error));
        });
    };
    ProfileComponent.prototype.getCountryData = function () {
        var _this = this;
        // alert
        this.general.getCountryData().then(function () {
            _this.countryData = _this.general.countryData;
            _this.selectedCountry = _this.countryData[0].country_fiat;
            console.log(_this.selectedCountry);
        });
    };
    ProfileComponent.prototype.showRadio = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Country');
        for (var i = 0; i < this.countryData.length; i++) {
            if (this.selectedCountry == this.countryData[i].country_fiat) {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_fiat,
                    value: this.countryData[i].country_fiat,
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_fiat,
                    value: this.countryData[i].country_fiat,
                });
            }
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.selectedCountry = data;
                _this.general.country = _this.selectedCountry;
                console.log(_this.general.country);
            }
        });
        alert.present();
    };
    // showallcountry() {
    //   console.log('select contry data');
    //   let alert = this.alertCtrl.create();
    //   alert.setTitle('Select Country');
    //   for (let i = 0; i < this.countryData.length; i++) {
    //     console.log("rinku js" + this.selectedCountryName);
    //     if (this.selectedCountryName == this.countryData[i].country_name) {
    //       console.log("rinku js" + this.selectedCountryName);
    //       alert.addInput({
    //         type: 'radio',
    //         label: this.countryData[i].country_name,
    //         value: this.countryData[i].country_name,
    //         checked: true
    //       });
    //     } else {
    //       alert.addInput({
    //         type: 'radio',
    //         label: this.countryData[i].country_name,
    //         value: this.countryData[i].country_name,
    //       });
    //     }
    //   }
    //   alert.addButton('Cancel');
    //   alert.addButton({
    //     text: 'OK',
    //     handler: data => {
    //       this.selectedCountryName = data;
    //       for (let value in this.countryData) {
    //         if (data == this.countryData[value].country_name) {
    //           this.general.country = this.countryData[value].country_id;
    //           this.selectedCountryFlag = this.countryData[value].country_flag;
    //           break;
    //         }
    //       }
    //       console.log(this.general.country);
    //     }
    //   });
    //   alert.present();
    // }
    // uploadDocs(val) {
    //   if (this.auth.twoFactorStatus == '1') {
    //     this.auth.UploadUserImage().then(() => {
    //       this.getImagePath(val);
    //     }, (error) => {
    //       this.auth.toastDesignClass = "error";
    //       this.auth.toastMsg = "An error occured!";
    //       this.auth.toast();
    //       this.auth.spinnerEnable.dismiss();
    //     })
    //   } else {
    //     this.auth.toastDesignClass = "error";
    //     this.auth.toastMsg = "Two step Verification is Not Enabled!";
    //     this.auth.toast();
    //   }
    // }
    ProfileComponent.prototype.uploadDocs = function () {
        var _this = this;
        // alert("jjj");
        //if (this.auth.twoFactorStatus == '1') {
        this.auth.UploadUserImage("profile").then(function (res) {
            _this.auth.userData.user_image = res;
            // this.getImagePath();
        }, function (error) {
            _this.appUtils.ShowToast(error, "bottom", 6000);
        });
        // } else {
        //   this.auth.toastDesignClass = "error";
        //   this.auth.toastMsg = "Two step Verification is Not Enabled!";
        //   this.auth.toast();
        // }
    };
    ProfileComponent.prototype.getImagePath = function () {
        //alert("uploadeImgPath::"+this.auth.uploadImagePath);
        this.userProfile.value.fupUserProfile = this.auth.uploadImagePath;
    };
    ProfileComponent.prototype.UploadUserImage = function () {
        this.auth.UploadUserImage('profile');
    };
    ProfileComponent.prototype.afterImageUpload = function (imageUpload, component) {
        console.log(imageUpload + ' ' + component);
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'profile',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\profile\profile.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title text-center style="margin-right: 4em;">PROFILE</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!--<ion-grid>\n    <ion-row>\n      <div class="outerDiv profile-avtar" *ngIf="auth.userprofiledata != null">\n        <ion-avatar item-start class="profileImage" (click)="uploadDocs()" *ngIf="auth.userData.user_image == \'no-image.png\' || auth.userData.user_image == null">\n          <img class="" style="border-radius: 50%;" src="assets/imgs/user.png">\n        </ion-avatar>\n        <ion-avatar item-start class="profileImage" (click)="uploadDocs()" *ngIf="auth.userprofiledata.user_image !== \'no-image.png\' && auth.userData.user_image != null">\n          <img class="profileImageTag" src="{{auth.userImageLink}}/{{userProfile.value.fupUserProfile}}">\n        </ion-avatar>\n      </div>\n    </ion-row>\n  </ion-grid>-->\n  <ion-grid *ngIf="auth.userprofiledata != undefined">\n    <ion-row>\n      <ion-col>\n        <form [formGroup]=\'userProfile\'>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Email</ion-label>\n            <ion-input name="Email" formControlName="Email" [disabled]="true"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">First Name</ion-label>\n            <ion-input formControlName=\'txtUserFirstName\' name="txtUserFirstName"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Last Name</ion-label>\n            <ion-input formControlName=\'txtUserLastName\' name="txtUserLastName"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">DOB(DD/MM/YYYY)</ion-label>\n            <ion-datetime displayFormat="DD/MM/YYYY" formControlName=\'txtUserDob\' [style.color]="\'white\'" name="txtUserDob" cancelText="Cancel" doneText="OK"></ion-datetime>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Gender</ion-label>\n            <!-- <ion-input formControlName=\'txtUserGender\' name="txtUserGender"></ion-input> -->\n            <ion-select formControlName=\'txtUserGender\'  name="txtUserGender">\n              <ion-option [value]="male" [selected] ="auth.userprofiledata.user_gender === \'male\'">Male</ion-option>\n              <ion-option [value]="female" [selected] ="auth.userprofiledata.user_gender === \'female\'">Female</ion-option>\n            </ion-select>\n            \n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Phone Number</ion-label>\n            <ion-input formControlName=\'numUserPhone\' type="number" name="numUserPhone"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Address</ion-label>\n            <ion-input formControlName=\'txtUserAddress\' name="txtUserAddress"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n            <ion-label floating class="labelProfile">Postal Code</ion-label>\n            <ion-input formControlName=\'numUserPostalCode\' type="number" name="numUserPostalCode"></ion-input>\n          </ion-item>\n          <ion-item class="itemProfile">\n              <ion-label floating class="labelProfile">State</ion-label>\n              <ion-input formControlName=\'txtUserState\' name="txtUserState"></ion-input>\n            </ion-item>\n          <ion-item class="itemProfile">\n\n            <ion-label floating class="labelProfile">Country</ion-label>\n            <!-- <ion-input formControlName=\'ddlUserCountry\'  name="ddlUserCountry"  (click)="showallcountry()"></ion-input> -->\n            <!-- <ion-select formControlName=\'ddlUserCountry\'>\n                            <ion-option  value="f">femal</ion-option>\n                            <ion-option value="m">Male</ion-option>\n                          </ion-select> -->\n            <ion-select formControlName=\'ddlUserCountry\'  name="ddlUserCountry">\n              <ng-container *ngFor="let country of countryData; let ind = index;">\n                <ion-option [value]="country.country_id" [selected]="country.country_id == auth.userprofiledata.country_id">\n                  {{country.country_name}}\n                </ion-option>\n              </ng-container>\n            </ion-select>\n\n\n          </ion-item>\n\n\n        </form>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <div class="outerDiv">\n          <button type="button" (click)="profileUpdateForm(userProfile.value)" ion-button round outline class="customBtn profileBtn">Submit</button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__["a" /* AppUtils */]])
    ], ProfileComponent);
    return ProfileComponent;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HowitworksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the HowitworksComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var HowitworksComponent = (function () {
    function HowitworksComponent() {
        console.log('Hello HowitworksComponent Component');
        this.text = 'Hello World';
    }
    HowitworksComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'howitworks',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\howitworks\howitworks.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      How It Works\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row style="background: #fff">\n      <ion-col>\n        <img style="width: 70%;float: right;" src="http://valuebit.lokhittrust.in/public/images/home/how-it-works-line.png" />\n      </ion-col>\n      <ion-col col-4>\n        <img src="http://valuebit.lokhittrust.in/public/images/icon/registration.png" />\n      </ion-col>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-row>\n          <ion-col col-4>\n            <img src="http://valuebit.lokhittrust.in/public/images/icon/verification.png">\n          </ion-col>\n          <ion-col>\n            <ion-card-header>\n              <ion-title>\n                <span style="color: #000; font-size: 2.4rem;">Registration</span>\n              </ion-title>\n            </ion-card-header>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-card-content style="text-align: justify">\n              On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n              a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n              back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n              to complete your registration.\n            </ion-card-content>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-row>\n          <ion-card-header>\n            <ion-title>\n              <span style="color: #000; font-size: 2.4rem;">Verification</span>\n            </ion-title>\n          </ion-card-header>\n          <ion-card-content style="text-align: justify">\n            On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n            a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n            back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n            to complete your registration.\n          </ion-card-content>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img style="width: 70%;float: right;" src="http://valuebit.lokhittrust.in/public/images/home/how-it-works-line.png" />\n          </ion-col>\n          <ion-col col-4>\n            <img src="http://valuebit.lokhittrust.in/public/images/icon/genrate.png">\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-row>\n          <ion-col col-4>\n            <img src="http://valuebit.lokhittrust.in/public/images/icon/verification.png">\n          </ion-col>\n          <ion-col>\n            <!-- <ion-card-header>\n              <ion-title> -->\n                <span style="color: #000; font-size: 2.4rem;font-weight: 500;">Generate Crypto Address</span>\n              <!-- </ion-title>\n            </ion-card-header> -->\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-card-content style="text-align: justify">\n              On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n              a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n              back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n              to complete your registration.\n            </ion-card-content>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-row>\n          <ion-card-header>\n            <ion-title>\n              <span style="color: #000; font-size: 2.4rem;">Fiat Wallet</span>\n            </ion-title>\n          </ion-card-header>\n          <ion-card-content style="text-align: justify">\n            On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n            a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n            back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n            to complete your registration.\n          </ion-card-content>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img style="width: 70%;float: right;" src="http://valuebit.lokhittrust.in/public/images/home/how-it-works-line.png" />\n          </ion-col>\n          <ion-col col-4>\n            <img src="http://valuebit.lokhittrust.in/public/images/icon/2actor.png">\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-row>\n          <ion-col col-4>\n            <img src="http://valuebit.lokhittrust.in/public/images/icon/notifications.png">\n          </ion-col>\n          <ion-col>\n           \n                <p style="color: #000; font-size: 2.4rem; font-weight: 500;"><b>Two Factor Authentication</b></p>\n             \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-card-content style="text-align: justify">\n              On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n              a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n              back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n              to complete your registration.\n            </ion-card-content>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-row>\n    <ion-row style="background: #fff">\n      <ion-card>\n        <ion-card-header>\n          <ion-title>\n            <span style="color: #000; font-size: 2.4rem;">Notifications</span>\n          </ion-title>\n        </ion-card-header>\n        <ion-card-content style="text-align: justify">\n          On the home page, enter a valid email id and password of your choice and hit CREATE ACCOUNT button. A validation email with\n          a link will be sent to the email id entered, once clicked on the link to verify your email, you will be directed\n          back to valuebit.com to continue with the registration process. Please read and accept the terms and conditions\n          to complete your registration.\n        </ion-card-content>\n      </ion-card>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\howitworks\howitworks.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HowitworksComponent);
    return HowitworksComponent;
}());

//# sourceMappingURL=howitworks.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KycDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the KycDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var KycDetailsComponent = (function () {
    function KycDetailsComponent(navCtrl, events, auth, formBuilder, viewCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.formActive = true;
        this.twoStepActive = false;
        this.disableTrue = true;
        this.kycDetailsForm = this.formBuilder.group({
            userIdProfFront: ['', ''],
            userIdProfBack: ['', ''],
            addProfFront: ['', ''],
            addProfBack: ['', ''],
            bankProfFront: ['', ''],
            bankProfBack: ['', '']
        });
        // this.events.subscribe('twoSF:verified', (twoSF, component) => {
        //     this.kycDetailsFromSubmit(twoSF, component);
        //     twoSF = null;
        //     component = null;
        // });
    }
    KycDetailsComponent_1 = KycDetailsComponent;
    KycDetailsComponent.prototype.checkTwoSf = function () {
        this.twoStepActive = true;
    };
    KycDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentName = KycDetailsComponent_1;
        console.log(this.auth.twoFactorStatus);
        this.auth.GetKycDetails().then(function () {
            _this.kycDetailsForm.patchValue({
                userIdProfBack: _this.auth.userKycData.id_proof_back,
                userIdProfFront: _this.auth.userKycData.id_proof_front,
                addProfBack: _this.auth.userKycData.addr_proof_back,
                addProfFront: _this.auth.userKycData.addr_proof_front,
            });
        }, function (error) {
        });
    };
    KycDetailsComponent.prototype.kycDetailsFromSubmit = function (formvalue) {
        // alert(JSON.stringify(formvalue));
        var _this = this;
        //  return true;
        if ((formvalue.userIdProfFront !== 'no-image.png' && formvalue.userIdProfFront !== null)
            && (formvalue.userIdProfBack !== 'no-image.png' && formvalue.userIdProfBack !== null)
            && (formvalue.addProfFront !== 'no-image.png' && formvalue.addProfFront !== null)
            && (formvalue.addProfBack !== 'no-image.png' && formvalue.addProfBack !== null)) {
            //   alert("into if condition");
            //  return; 
            // return true;
            console.log(formvalue);
            // if ((component == KycDetailsComponent) && (twoSF != undefined)) {
            this.auth.spinner();
            this.auth.postKycDetails(this.kycDetailsForm.value).then(function () {
                _this.auth.toastMsg = "Kyc Details Submitted";
                _this.auth.toastDesignClass = "success";
                _this.auth.toast();
                _this.auth.spinnerEnable.dismiss();
                setTimeout(function () {
                    _this.navCtrl.pop();
                }, _this.auth.toastTimeOut);
                _this.twoStepActive = true;
            }, function (error) {
                _this.auth.toastDesignClass = "error";
                _this.auth.toastMsg = "An error occured!";
                _this.auth.toast();
                _this.auth.spinnerEnable.dismiss();
            });
            // } else {
            //     this.auth.toastDesignClass = "error";
            //     this.auth.toastMsg = "Two step Verification is Not Enabled!";
            //     this.auth.toast();
            // }
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: '',
                message: 'Please upload all documents',
                buttons: ['ok'],
            });
            alert_1.present();
        }
    };
    KycDetailsComponent.prototype.uploadDocs = function (val) {
        var _this = this;
        if (this.auth.twoFactorStatus == '1') {
            this.auth.UploadUserImage('kyc').then(function () {
                _this.getImagePath(val);
            }, function (error) {
                _this.auth.toastDesignClass = "error";
                _this.auth.toastMsg = "An error occired!";
                _this.auth.toast();
                _this.auth.spinnerEnable.dismiss();
            });
        }
        else {
            this.auth.toastDesignClass = "error";
            this.auth.toastMsg = "Two step Verification is Not Enabled!";
            this.auth.toast();
        }
    };
    KycDetailsComponent.prototype.getImagePath = function (val) {
        if (val == 'userIdProfFront') {
            this.kycDetailsForm.value.userIdProfFront = this.auth.uploadImagePath;
        }
        else if (val == 'userIdProfBack') {
            this.kycDetailsForm.value.userIdProfBack = this.auth.uploadImagePath;
        }
        else if (val == 'addProfFront') {
            this.kycDetailsForm.value.addProfFront = this.auth.uploadImagePath;
        }
        else if (val == 'addProfBack') {
            this.kycDetailsForm.value.addProfBack = this.auth.uploadImagePath;
            // } else if (val == 'bankProfFront') {
            //     this.kycDetailsForm.value.bankProfFront = this.auth.uploadImagePath;
            // } else if (val == 'bankProfBack') {
            //     this.kycDetailsForm.value.bankProfBack = this.auth.uploadImagePath;
        }
        else {
            alert('invalid input');
        }
    };
    KycDetailsComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    KycDetailsComponent = KycDetailsComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'kyc-details',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\kyc-details\kyc-details.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title class="navbarApp">KYC DETAILS</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text color="primary" showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-title text-center>\n        <!-- Kyc Details -->\n    </ion-title>\n\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <form [formGroup]="kycDetailsForm">\n                    <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'userIdProfFront\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.userIdProfFront === \'\') || (kycDetailsForm.value.userIdProfFront === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.userIdProfFront !== \'\') && (kycDetailsForm.value.userIdProfFront !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.userIdProfFront" onerror ="this.src=\'assets/imgs/file.png\'">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Identity Proof (Front Side)</ion-label>\n                                        <ion-input [disabled]=\'disableTrue\' type="number" formControlName="userIdProfFront"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card>\n                    <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'userIdProfBack\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.userIdProfBack === \'\') || (kycDetailsForm.value.userIdProfBack === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.userIdProfBack !== \'\') && (kycDetailsForm.value.userIdProfBack !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.userIdProfBack" onerror ="this.src=\'assets/imgs/file.png\'">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Identity Proof(Back Side)</ion-label>\n                                        <ion-input type="number" [disabled]=\'disableTrue\' formControlName="userIdProfBack"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card>\n                    <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'addProfFront\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.addProfFront === \'\') || (kycDetailsForm.value.addProfFront === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.addProfFront !== \'\') && (kycDetailsForm.value.addProfFront !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.addProfFront" onerror ="this.src=\'assets/imgs/file.png\'">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Address Proof(Front Side)</ion-label>\n                                        <ion-input type="number" [disabled]=\'disableTrue\' formControlName="addProfFront"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card>\n                    <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'addProfBack\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.addProfBack === \'\') || (kycDetailsForm.value.addProfBack === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.addProfBack !== \'\') && (kycDetailsForm.value.addProfBack !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.addProfBack" onerror ="this.src=\'assets/imgs/file.png\'">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Address Proof(Back Side)</ion-label>\n                                        <ion-input type="number" [disabled]=\'disableTrue\' formControlName="addProfBack"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card>\n                    <!-- <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'bankProfFront\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.bankProfFront === \'\') || (kycDetailsForm.value.bankProfFront === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.bankProfFront !== \'\') && (kycDetailsForm.value.bankProfFront !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.bankProfFront">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Bank Proof(Front Side)</ion-label>\n                                        <ion-input type="number" [disabled]=\'disableTrue\' formControlName="bankProfFront"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card>\n                    <ion-card>\n                        <ion-card-content>\n                            <ion-row (click)="uploadDocs(\'bankProfBack\')">\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.bankProfBack === \'\') || (kycDetailsForm.value.bankProfBack === null)">\n                                    <img class="coinIcon" src="assets/imgs/file.png">\n                                </ion-col>\n                                <ion-col col-3 class="icon-container" *ngIf="(kycDetailsForm.value.bankProfBack !== \'\') && (kycDetailsForm.value.bankProfBack !== null)">\n                                    <img class="coinIcon" [src]="auth.userImageLink + kycDetailsForm.value.bankProfBack">\n                                </ion-col>\n                                <ion-col col-9 class="icon-container">\n                                    <ion-item>\n                                        <ion-label>Bank Proof(Back Side)</ion-label>\n                                        <ion-input type="number" [disabled]=\'disableTrue\' formControlName="bankProfBack"></ion-input>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                    </ion-card> -->\n                    <div class="outerDiv">\n                        <button ion-button type="button" class="customBtn" (click)="kycDetailsFromSubmit(kycDetailsForm.value)"  [disabled]="!kycDetailsForm.valid">\n                            Submit\n                        </button>\n                    </div>\n\n                </form>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <!-- <ion-grid *ngIf=\'twoStepActive\'>\n        <ion-row>\n            <ion-col>\n                <two-sf [sendTo]="componentName"></two-sf>\n            </ion-col>\n        </ion-row>\n    </ion-grid> -->\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\kyc-details\kyc-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], KycDetailsComponent);
    return KycDetailsComponent;
    var KycDetailsComponent_1;
}());

//# sourceMappingURL=kyc-details.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatDepositComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_fiat_fiat__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FiatDepositComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FiatDepositComponent = (function () {
    function FiatDepositComponent(fiat, events, formBuilder, viewCtrl) {
        var _this = this;
        this.fiat = fiat;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.formActive = true;
        this.twoStepActive = false;
        this.called = false;
        this.workinprogress = false;
        this.sendTo = 'FiatDepositComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'FiatDepositComponent') {
                _this.submitDataOnSuccess();
            }
        });
        this.todo = this.formBuilder.group({
            depositAmount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            frombankName: ['nes', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            frombankAccount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            bankRefNo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            accToDepositIn: ['n64', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            transPass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
        });
    }
    FiatDepositComponent.prototype.submitDataOnSuccess = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.fiat.FiatDeposit(this.todo.value).then(function () {
                _this.called = false;
            }, function (error) {
                _this.called = false;
                console.log(error);
            });
        }
    };
    FiatDepositComponent.prototype.logForm = function () {
        /// work in progress
        this.workinprogress = true;
        //  return
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.todo.value);
    };
    FiatDepositComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.todo.reset();
    };
    FiatDepositComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FiatDepositComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'fiat-deposit',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-deposit\fiat-deposit.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:2em">FIAT DEPOSIT</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center>\n    <!-- FIAT WALLET -->\n  </ion-title>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <form [formGroup]="todo" (ngSubmit)="logForm()">\n          <ion-item class="formInput">\n            <ion-label><i class="fa fa-id-card"></i></ion-label>\n            <ion-input placeholder="Deposit Amount (19282)" [disabled]=\'!formActive\' type="number" formControlName="depositAmount"></ion-input>\n          </ion-item>\n          <ion-item class="ddlformInput">\n            <ion-label>From Bank Name</ion-label>\n            <ion-select placeholder="" [disabled]=\'!formActive\' formControlName="frombankName">\n              <ion-option value="nes" >NES</ion-option>\n              <ion-option value="n64">Nintendo64</ion-option>\n              <ion-option value="ps">PlayStation</ion-option>\n              <ion-option value="genesis">Sega Genesis</ion-option>\n              <ion-option value="saturn">Sega Saturn</ion-option>\n              <ion-option value="snes">SNES</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label><i class="fa fa-university"></i></ion-label>\n            <ion-input placeholder="From Bank Account" [disabled]=\'!formActive\' type="number" formControlName="frombankAccount"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label><i class="fa fa-credit-card"></i></ion-label>\n            <ion-input placeholder="Bank Reference Number" [disabled]=\'!formActive\' type="number" formControlName="bankRefNo"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label><i class="fa fa-edit"></i></ion-label>\n            <ion-input  placeholder="Your Description" [disabled]=\'!formActive\' type="text" formControlName="description"></ion-input>\n          </ion-item>\n          <ion-item class="ddlformInput">\n            <ion-label><ion-icon name="logo-usd"></ion-icon>Which Bank too deposit</ion-label>\n            <ion-select placeholder="" [disabled]=\'!formActive\'  formControlName="accToDepositIn" name="accToDepositIn">\n              <ion-option value="nes" >NES</ion-option>\n              <ion-option value="n64">Nintendo64</ion-option>\n              <ion-option value="ps">PlayStation</ion-option>\n              <ion-option value="genesis">Sega Genesis</ion-option>\n              <ion-option value="saturn">Sega Saturn</ion-option>\n              <ion-option value="snes">SNES</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label><i class="fa fa-key"></i></ion-label>\n            <ion-input placeholder="Transaction Password" [disabled]=\'!formActive\' type="number" formControlName="transPass"></ion-input>\n          </ion-item>\n          <div class="outerDiv">\n            <button class="customBtn" ion-button type="submit" [hidden]="!formActive" [disabled]="!this.todo.valid">Submit</button>\n          </div>\n          <ion-label *ngIf="workinprogress" style="color:white; font-size: 20px; text-align: center;">Work in progress</ion-label>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-deposit\fiat-deposit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_fiat_fiat__["a" /* FiatProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], FiatDepositComponent);
    return FiatDepositComponent;
}());

//# sourceMappingURL=fiat-deposit.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatWithdrawalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_fiat_fiat__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FiatWithdrawalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FiatWithdrawalComponent = (function () {
    function FiatWithdrawalComponent(fiat, events, formBuilder, viewCtrl) {
        var _this = this;
        this.fiat = fiat;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.formActive = true;
        this.twoStepActive = false;
        this.called = false;
        this.workinprogress = false;
        this.sendTo = 'FiatWithdrawalComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'FiatWithdrawalComponent') {
                _this.submitDataOnSuccess();
            }
        });
        this.todo = this.formBuilder.group({
            withdrawalAmount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            nameofAccHolder: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            bankName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            accNo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(14)])],
            ifscCode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            swiftCode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    }
    FiatWithdrawalComponent.prototype.submitDataOnSuccess = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.fiat.FiatWithdraw(this.todo.value).then(function () {
                _this.called = false;
            }, function (error) {
                _this.called = false;
                console.log(error);
            });
        }
    };
    FiatWithdrawalComponent.prototype.logForm = function () {
        /// work in progress
        this.workinprogress = true;
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.todo.value);
    };
    FiatWithdrawalComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.todo.reset();
    };
    FiatWithdrawalComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FiatWithdrawalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'fiat-withdrawal',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-withdrawal\fiat-withdrawal.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:2em">FIAT WITHDRAWL</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center>\n    <!-- FIAT WALLET -->\n  </ion-title>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <form [formGroup]="todo" (ngSubmit)="logForm()">\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Withdrawal Amount (2636)" [disabled]=\'!formActive\' type="number" formControlName="withdrawalAmount"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Name on Bank Account" [disabled]=\'!formActive\' type="text" formControlName="nameofAccHolder"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Bank Name" [disabled]=\'!formActive\' type="text" formControlName="bankName"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Bank A/C Number" [disabled]=\'!formActive\' type="number" formControlName="accNo"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Bank IFS Code" [disabled]=\'!formActive\' type="text" formControlName="ifscCode"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Bank Swift Code" [disabled]=\'!formActive\' type="text" formControlName="swiftCode"></ion-input>\n          </ion-item>\n          <div class="outerDiv">\n            <!-- <button class="customBtn" ion-button type="submit" [disabled]="!todo.valid">Submit</button> -->\n            <button class="customBtn" ion-button type="submit" [hidden]="!formActive" [disabled]="!this.todo.valid">Submit</button>\n          </div>\n          <ion-label *ngIf="workinprogress" style="color:white; font-size: 20px; text-align: center;">Work in progress</ion-label>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-withdrawal\fiat-withdrawal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_fiat_fiat__["a" /* FiatProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], FiatWithdrawalComponent);
    return FiatWithdrawalComponent;
}());

//# sourceMappingURL=fiat-withdrawal.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatHistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FiatHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FiatHistoryComponent = (function () {
    function FiatHistoryComponent(formBuilder, viewCtrl) {
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.historyData = "0";
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
        ];
    }
    FiatHistoryComponent.prototype.logForm = function () {
        console.log(this.todo.value);
    };
    FiatHistoryComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FiatHistoryComponent.prototype.SelectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    FiatHistoryComponent.prototype.moveButton = function ($event) {
        this.historyData = $event._snapIndex.toString();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], FiatHistoryComponent.prototype, "slider", void 0);
    FiatHistoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'fiat-history',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-history\fiat-history.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:4em">FIAT HISTORY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-segment [(ngModel)]="historyData" color="dark">\n    <ion-segment-button value="0" (click)="SelectedTab(0)">\n      SEND\n    </ion-segment-button>\n    <ion-segment-button value="1" (click)="SelectedTab(1)">\n      BUY\n    </ion-segment-button>\n    <ion-segment-button value="2" (click)="SelectedTab(2)">\n      SELL\n    </ion-segment-button>\n    <ion-segment-button value="3" (click)="SelectedTab(3)">\n      RECEIVE\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n<ion-content style="margin-top:5px">\n  <!-- <ion-title text-center padding>\n \n  </ion-title> -->\n  <ion-slides #slider (ionSlideWillChange)="moveButton($event)">\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'0\'" no-lines no-padding>\n        <!-- <div > -->\n          <ion-card *ngFor=\'let trans of transactionHistory; let i = index\'>\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" src="assets/imgs/cryptoicn/btc.png" />\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.id}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.date}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currAmount}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Fee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currNet}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        <!-- </div> -->\n      </ion-list>\n\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'1\'">\n        <div *ngFor=\'let trans of transactionHistory; let i = index\'>\n          <ion-card>\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" src="assets/imgs/cryptoicn/btc.png">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.id}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.date}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currAmount}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Fee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currNet}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'2\'">\n        <div *ngFor=\'let trans of transactionHistory; let i = index\'>\n          <ion-card>\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" src="assets/imgs/cryptoicn/btc.png">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.id}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.date}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currAmount}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Fee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currNet}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'3\'">\n        <div *ngFor=\'let trans of transactionHistory; let i = index\'>\n          <ion-card>\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" src="assets/imgs/cryptoicn/btc.png">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.id}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.date}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currAmount}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Fee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currFee}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.currNet}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n    </ion-slide>\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-history\fiat-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], FiatHistoryComponent);
    return FiatHistoryComponent;
}());

//# sourceMappingURL=fiat-history.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyBuyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CryptoCurrencyBuyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CryptoCurrencyBuyComponent = (function () {
    function CryptoCurrencyBuyComponent(events, formBuilder, viewCtrl, cryptoService, params, general, auth) {
        var _this = this;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.cryptoService = cryptoService;
        this.params = params;
        this.general = general;
        this.auth = auth;
        this.formActive = true;
        this.twoStepActive = false;
        this.called = false;
        this.sendTo = 'CryptoCurrencyBuyComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'CryptoCurrencyBuyComponent') {
                _this.submitDataOnSuccess();
            }
        });
        this.currencyBuyForm = this.formBuilder.group({
            txtCurrencyBuyAmountNew: [1, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            transPass: [''],
            radPaymentType: ['wallet', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            txtCurrencyBuyFees: [1, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            tax: [''],
            txtCurrencyBuyTotal: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            txtCurrencyBuyAmount: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            txtCurrencyBuyFeesTransaction: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    }
    CryptoCurrencyBuyComponent.prototype.ngOnInit = function () {
        this.selectedCoin = this.params.get('currency');
        //alert(this.selectedCoin.curr_code+", ParamSting::" + JSON.stringify(this.general.liveData, null, 4));    
        for (var _i = 0, _a = this.general.liveData; _i < _a.length; _i++) {
            var coin = _a[_i];
            if (this.selectedCoin.curr_code == 'BCY') {
                this.currentPrice = parseFloat(coin['BTC'][this.general.country]);
            }
            else {
                this.currentPrice = parseFloat(coin[this.selectedCoin.curr_code][this.general.country]);
            }
        }
        this.CalculateMoney();
        //   this.crytoService.CryptoHistory(this.params.get('currency').cur_code).then((data)=>{
        //     console.log("HistoryData::"+JSON.stringify(this.crytoService.CryptoHistory,null,4))
        //   },
        // (error)=>{
        //   alert(error);
        // })
    };
    CryptoCurrencyBuyComponent.prototype.CalculateMoney = function () {
        //alert("Hlloooo");
        var feeAmount = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) / 100;
        var total = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) + feeAmount;
        var totalInShatoshi = this.currencyBuyForm.value.txtCurrencyBuyAmountNew * Math.pow(10, 8);
        this.currencyBuyForm.patchValue({
            txtCurrencyBuyTotal: total,
            txtCurrencyBuyAmount: totalInShatoshi,
            txtCurrencyBuyFeesTransaction: feeAmount
        });
        // alert(this.currencyBuyForm.value.txtCurrencyBuyTotal+", Hlloooo::"+this.currencyBuyForm.value.txtCurrencyBuyTotal);
    };
    CryptoCurrencyBuyComponent.prototype.logForm = function () {
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.currencyBuyForm.value);
    };
    CryptoCurrencyBuyComponent.prototype.submitDataOnSuccess = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.auth.spinner();
            this.cryptoService.CryptoBuy(this.currencyBuyForm.value, this.selectedCoin.curr_code).then(function (res) {
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastMsg = res;
                _this.auth.toastDesignClass = "success";
                _this.auth.toast();
                _this.dismiss();
            }, function (error) {
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastMsg = error;
                _this.auth.toastDesignClass = "error";
                _this.auth.toast();
                console.log(error);
            });
        }
    };
    CryptoCurrencyBuyComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.currencyBuyForm.reset();
    };
    CryptoCurrencyBuyComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CryptoCurrencyBuyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-buy',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-buy\crypto-currency-buy.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:3em">BUY CRYPTOCURRENCY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <!-- <span ion-text color="primary" showWhen="ios">Cancel</span> -->\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center color="dark" *ngIf="selectedCoin != undefined">\n    <span style="color:#000">Buy {{selectedCoin.curr_code}}</span>\n  </ion-title>\n\n  <ion-grid *ngIf="selectedCoin != undefined">\n    <ion-row>\n      <ion-col>\n        <ion-row class="btcLimitTag">\n          <ion-chip color="primary">\n            <ion-label color="dark">Your Buying Limits\n              <br/>\n              <b>10 per 24 hours. You can buy 10 now.</b>\n            </ion-label>\n          </ion-chip>\n        </ion-row>\n        <form [formGroup]="currencyBuyForm" (ngSubmit)="logForm()">\n          <ion-label class="label">{{selectedCoin.curr_code}} : Current Rate:{{currentPrice}} ({{general.country}} {{currentPrice * currencyBuyForm.value.txtCurrencyBuyAmountNew}})\n          </ion-label>\n          <ion-item class="formInput">\n            <ion-label>{{selectedCoin.curr_code}}:</ion-label>\n            <ion-input [disabled]=\'!formActive\' type="number" formControlName="txtCurrencyBuyAmountNew" (keyup)="CalculateMoney()"></ion-input>\n          </ion-item>\n          <!-- <ion-grid>\n            <ion-row>\n              <ion-col>\n                <ion-title>\n                  <div style="color:#000">OR</div>\n                </ion-title>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-item class="formInput">\n            <ion-label>{{general.country}}:</ion-label>\n            <ion-input type="number" [disabled]=\'!formActive\' formControlName="transPass"></ion-input>\n          </ion-item> \n          <ion-label class="label">At Rs:\n            <b> 744354 </b> per BTC\n          </ion-label>-->\n          <ion-item class="formInput">\n            <ion-label style="text-align:left;">\n              <ion-icon name="card"></ion-icon>&nbsp;&nbsp;Payment Type\n            </ion-label>\n            <!-- <ion-select formControlName=\'radPaymentType\' [disabled]=\'!formActive\' name="radPaymentType">\n              <ion-option value="f" [selected]="currencyBuyForm.value.radPaymentType == \'f\'">{{general.country}} Balance {{currencyBuyForm.value.radPaymentType}}</ion-option>\n              <ion-option value="m" [selected]="currencyBuyForm.value.radPaymentType == \'m\'">Wallets and Netbanking ( Additional 1.9% processing fee applies)</ion-option>\n            </ion-select> -->\n            <ion-select formControlName=\'radPaymentType\' name="radPaymentType">\n              <ion-option style="color:#fff;" [value]="bal" [selected]="currencyBuyForm.value.radPaymentType == \'bal\'">\n                {{general.country}} Balance {{currencyBuyForm.value.radPaymentType}}\n              </ion-option>\n              <ion-option style="color:#fff;" [value]="wallet" [selected]="currencyBuyForm.value.radPaymentType == \'wallet\'">\n                Wallets and Netbanking ( Additional 1.9% processing fee applies)\n              </ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="usd"></ion-icon>&nbsp;&nbsp;FEE:(%)\n            </ion-label>\n            <ion-input type="number" formControlName="txtCurrencyBuyFees" [disabled]=\'true\'></ion-input>\n          </ion-item>\n          <!-- <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="albums"></ion-icon>&nbsp;&nbsp;TAX:\n            </ion-label>\n            <ion-input type="number" formControlName="tax" [disabled]=\'!formActive\'></ion-input>\n          </ion-item> -->\n          <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="card"></ion-icon>&nbsp;&nbsp;Total:\n            </ion-label>\n            <ion-input type="number" formControlName="txtCurrencyBuyTotal" [disabled]=\'true\'></ion-input>\n            <ion-input type="number" formControlName="txtCurrencyBuyAmount" [hidden]="true" [disabled]=\'true\'></ion-input>\n            <ion-input type="number" formControlName="txtCurrencyBuyFeesTransaction" [hidden]="true" [disabled]=\'true\'></ion-input>\n          </ion-item>\n          <div class="outerDiv">\n            <button ion-button type="submit" class="customBtn" [hidden]="twoStepActive" [disabled]="!currencyBuyForm.valid">\n              Buy\n            </button>\n          </div>\n          <ion-label class="label">(You will confirm in next step)\n          </ion-label>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n          <ion-title text-center color="dark">\n              <span style="color:#000">Verify 2-FA password</span>\n            </ion-title>\n        <ion-title>Verify 2-FA password</ion-title>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-buy\crypto-currency-buy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]])
    ], CryptoCurrencyBuyComponent);
    return CryptoCurrencyBuyComponent;
}());

//# sourceMappingURL=crypto-currency-buy.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyHistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CryptoCurrencyHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CryptoCurrencyHistoryComponent = (function () {
    function CryptoCurrencyHistoryComponent(formBuilder, viewCtrl, crytoService, params, pnkServiceHist, appUtilsHist) {
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.crytoService = crytoService;
        this.params = params;
        this.pnkServiceHist = pnkServiceHist;
        this.appUtilsHist = appUtilsHist;
        this.historyData = "0";
        this.todo = this.formBuilder.group({
            depositAmount: [''],
            frombankName: [''],
            frombankAccount: [''],
            bankRefNo: [''],
            description: [''],
            accToDepositIn: [''],
            transPass: [''],
        });
    }
    CryptoCurrencyHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        //alert("ParamSting::"+JSON.stringify(this.params.get('currency'),null,4));
        this.selectedCurrencyData = this.params.get('currency');
        this.crytoService.CryptoHistory(this.selectedCurrencyData.curr_code).then(function (data1) {
            _this.myhistorydata = _this.crytoService.CryptoHistoryList;
            console.log("HistoryData::" + JSON.stringify(_this.myhistorydata, null, 4));
        }, function (error) {
            alert(error);
        });
    };
    CryptoCurrencyHistoryComponent.prototype.logForm = function () {
        console.log(this.todo.value);
    };
    CryptoCurrencyHistoryComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CryptoCurrencyHistoryComponent.prototype.SelectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    CryptoCurrencyHistoryComponent.prototype.moveButton = function ($event) {
        this.historyData = $event._snapIndex.toString();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], CryptoCurrencyHistoryComponent.prototype, "slider", void 0);
    CryptoCurrencyHistoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-history',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-history\crypto-currency-history.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:4em">CRYPTOCURRENCY HISTORY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-segment [(ngModel)]="historyData" color="dark">\n    <ion-segment-button value="0" (click)="SelectedTab(0)">\n      SEND\n    </ion-segment-button>\n    <ion-segment-button value="1" (click)="SelectedTab(1)">\n      EXCHANGE\n    </ion-segment-button>\n    <!-- <ion-segment-button value="2" (click)="SelectedTab(2)">\n      SELL\n    </ion-segment-button> -->\n    <ion-segment-button value="2" (click)="SelectedTab(2)">\n      RECEIVE\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n<ion-content>\n  <ion-slides #slider (ionSlideWillChange)="moveButton($event)">\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'0\' && myhistorydata != undefined && myhistorydata.sendCurrency != undefined" no-lines no-padding>\n        <div *ngFor=\'let trans of myhistorydata.sendCurrency; let i = index\'>\n          <ion-card *ngIf="trans.error ==\'\'">\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" [src]="appUtilsHist.SanitizeUrl(this.pnkServiceHist.AssetsUrl+\'storage/uploads/user_null/\'+selectedCurrencyData.curr_image)">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.trans_id || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.created_at || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Status:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span style="text-transform: capitalize">{{trans.status || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <!-- <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.tx_fees || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.net_amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row> -->\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n      <div *ngIf="myhistorydata == undefined || myhistorydata.sendCurrency == undefined" style="color:white;">No data availble</div>\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'1\' && myhistorydata != undefined && myhistorydata.currencyexchange != undefined">\n        <div *ngFor=\'let trans of myhistorydata.currencyexchange; let i = index\'>\n          <ion-card *ngIf="trans.error ==\'\'">\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img center-img" [src]="appUtilsHist.SanitizeUrl(this.pnkServiceHist.AssetsUrl+\'storage/uploads/user_null/\'+selectedCurrencyData.curr_image)">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.trans_id || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.created_at || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Status:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span style="text-transform: capitalize">{{trans.status || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <!-- <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.tx_fees || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.net_amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row> -->\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n      <div *ngIf=" myhistorydata == undefined || myhistorydata.currencyexchange == undefined" style="color:white;">No data availble</div>\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'2\' && myhistorydata != undefined && myhistorydata.sellCurrency != undefined">\n        <div *ngFor=\'let trans of myhistorydata.sellCuryncy; let i = index\'>\n          <ion-card *ngIf="trans.error ==\'\'">\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" src="{{pnkServiceHist.AssetsUrl}}storage/uploads/user_null/{{selectedCurrencyData.curr_image}}">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.id || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.date || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Fee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.fee || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.tx_fees || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.net_amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n      <div *ngIf=" myhistorydata == undefined || myhistorydata.sellCurrency == undefined ||  myhistorydata.sellCurrency == null"\n        style="color:white;">No data availble</div>\n    </ion-slide>\n    <ion-slide>\n      <ion-list *ngIf="historyData == \'3\' && myhistorydata != undefined && myhistorydata.receiveCurrency != undefined">\n        <div *ngFor=\'let trans of myhistorydata.receiveCurrency; let i = index\'>\n          <ion-card *ngIf="trans.error ==\'\'">\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-3 class="icon-container btc">\n                  <img class="center-img" [src]="appUtilsHist.SanitizeUrl(this.pnkServiceHist.AssetsUrl+\'storage/uploads/user_null/\'+selectedCurrencyData.curr_image)">\n                </ion-col>\n                <ion-col col-9>\n                  <div class="outerTransaction">\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div style="font-weight:bolder;">Transaction Id: {{trans.trans_id || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                    <ion-row>\n                      <ion-col class="dataCard">\n                        <div>Date: {{trans.created_at || \'N/A\'}}</div>\n                      </ion-col>\n                    </ion-row>\n                  </div>\n                  <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Amount:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Status:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span style="text-transform: capitalize">{{trans.status || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row>\n                  <!-- <ion-row>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">TFee:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.tx_fees || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                    <ion-col col-6 class="dataCard">\n                      <ion-row>\n                        <span style="font-weight:bolder;">Net:</span>\n                      </ion-row>\n                      <ion-row>\n                        <span>{{trans.net_amount || \'N/A\'}}</span>\n                      </ion-row>\n                    </ion-col>\n                  </ion-row> -->\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-list>\n      <div *ngIf=" myhistorydata == undefined || myhistorydata.receiveCurrency == undefined ||  myhistorydata.receiveCurrency == null"\n        style="color:white;">No data availble</div>\n    </ion-slide>\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-history\crypto-currency-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_5__providers_apputils_apputils__["a" /* AppUtils */]])
    ], CryptoCurrencyHistoryComponent);
    return CryptoCurrencyHistoryComponent;
}());

//# sourceMappingURL=crypto-currency-history.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencySendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the CryptoCurrencySendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CryptoCurrencySendComponent = (function () {
    function CryptoCurrencySendComponent(cryptoService, events, formBuilder, viewCtrl, params, general, auth, appUtils) {
        var _this = this;
        this.cryptoService = cryptoService;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.general = general;
        this.auth = auth;
        this.appUtils = appUtils;
        this.formActive = true;
        this.twoStepActive = false;
        this.called = false;
        this.enableBtn = false;
        this.sendTo = 'CryptoCurrencySendComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'CryptoCurrencySendComponent') {
                _this.SendTransactionObj();
            }
        });
        this.currencySendForm = this.formBuilder.group({
            fromBtcAddress: [''],
            txtToCurrencyAddress: [''],
            txtCurrencySendAmountCrypto: [1, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            txtCurrencySendTxs: [''],
            txtCurrencySendAmount: [''],
            txtCurrencySendFees: ['']
        });
    }
    CryptoCurrencySendComponent.prototype.ngOnInit = function () {
        this.selectedCoin = this.params.get('currency');
        console.log("CurrencyData At Load::" + JSON.stringify(this.selectedCoin, null, 4));
        //alert(this.selectedCoin.curr_code+", ParamSting::" + JSON.stringify(this.general.liveData, null, 4));    
        for (var _i = 0, _a = this.general.liveData; _i < _a.length; _i++) {
            var coin = _a[_i];
            if (this.selectedCoin.curr_code == 'BCY') {
                this.currentPrice = parseFloat(coin['BTC'][this.general.country]);
            }
            else {
                this.currentPrice = parseFloat(coin[this.selectedCoin.curr_code][this.general.country]);
            }
        }
        this.CalculateMoney();
    };
    CryptoCurrencySendComponent.prototype.CalculateMoney = function () {
        var _this = this;
        if (this.currencySendForm.value.txtToCurrencyAddress != '' && this.currencySendForm.value.txtCurrencySendAmountCrypto > 0) {
            this.enableBtn = true;
        }
        else {
            this.enableBtn = false;
        }
        //alert("Hlloooo");
        // let feeAmount = (this.currentPrice * this.currencySendForm.value.txtCurrencySendAmountCrypto) / 100;
        // let total = (this.currentPrice * this.currencySendForm.value.txtCurrencySendAmountCrypto) + feeAmount;
        // let totalInShatoshi = this.currencySendForm.value.txtCurrencySendAmountCrypto * Math.pow(10, 8);
        var data = { service_type: 'transfer', amount_in_shatoshi: this.currencySendForm.value.txtCurrencySendAmountCrypto * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, from_currency: this.selectedCoin.curr_code };
        this.cryptoService.CurrencyConversion(data).then(function (res) {
            //alert("jljlj:"+JSON.stringify(res, null,4));
            //this.currencySendForm.patchValue({
            // txtCurrencySendTotal: total,
            _this.currencySendForm.value.txtCurrencySendAmount = data.amount_in_shatoshi;
            // txtCurrencySendFeesTransaction: feeAmount,
            _this.currencySendForm.value.txtFinalAmountForSend = res.finalamount.value,
                _this.currencySendForm.value.txtFinalCommisionForSend = res.servicecommision.value;
            // });
        }, function (error) {
            _this.appUtils.ShowToast(error, 'bottom', 6000);
            console.log("ErrorWhileConversion:" + error);
        });
        // alert(this.currencyBuyForm.value.txtCurrencyBuyTotal+", Hlloooo::"+this.currencyBuyForm.value.txtCurrencyBuyTotal);
    };
    CryptoCurrencySendComponent.prototype.SendCurrencyAmount = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.auth.spinner();
            this.cryptoService.CryptoSend(this.currencySendForm.value, this.selectedCoin.curr_code).then(function (res) {
                _this.ShowTransactionForm();
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.currencySendForm.value.txtCurrencySendTxs = res;
                // });        
                //this.dismiss();
            }, function (error) {
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastMsg = error;
                _this.auth.toastDesignClass = "error";
                _this.auth.toast();
                console.log(error);
            });
        }
    };
    CryptoCurrencySendComponent.prototype.ShowTransactionForm = function () {
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.currencySendForm.value);
    };
    CryptoCurrencySendComponent.prototype.SendTransactionObj = function () {
        var _this = this;
        console.log(this.currencySendForm.value);
        if (!this.called) {
            this.called = true;
            this.auth.spinner();
            //alert("FormData::"+JSON.stringify(this.currencySendForm.value,null,4));
            console.log("FormData::" + JSON.stringify(this.currencySendForm.value, null, 4));
            this.cryptoService.CryptoSendTransactionObj(this.currencySendForm.value, this.selectedCoin.curr_code).then(function (res) {
                _this.SendCurrencyAmount();
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastMsg = res;
                _this.auth.toastDesignClass = "success";
                _this.auth.toast();
                setTimeout(function () {
                    _this.cryptoService.GetCryptoCurrencyWallets().then(function (res) {
                    });
                }, 10000);
                _this.dismiss();
            }, function (error) {
                _this.called = false;
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastMsg = error;
                _this.auth.toastDesignClass = "error";
                _this.auth.toast();
                console.log(error);
            });
        }
    };
    CryptoCurrencySendComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.currencySendForm.reset();
    };
    CryptoCurrencySendComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CryptoCurrencySendComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-send',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-send\crypto-currency-send.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:2em">SEND CRYPTOCURRENCY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center color="dark" *ngIf="selectedCoin != undefined">\n    <span style="color:#000">Send {{selectedCoin.curr_code}}</span>\n  </ion-title>\n  <ion-label class="label">\n    Wallet Balance : {{selectedCoin.available_balance || 0}}\n  </ion-label>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <form [formGroup]="currencySendForm" (ngSubmit)="SendCurrencyAmount()">\n          <!-- <ion-item class="formInput">\n            <ion-label>\n              <i class="fa fa-address-book"></i>\n            </ion-label>\n            <ion-input placeholder="From BTC Address" [disabled]=\'!formActive\' type="number" formControlName="fromBtcAddress"></ion-input>\n          </ion-item> -->\n          <ion-item class="formInput">\n            <ion-label>\n              <i class="fa fa-address-book"></i>\n            </ion-label>\n            <ion-input placeholder="To BTC Address" [disabled]=\'!formActive\' type="text" formControlName="txtToCurrencyAddress" (keyup)="CalculateMoney()"></ion-input>\n          </ion-item>\n\n          <!-- <ion-label class="label">\n            {{selectedCoin.curr_code}} : Current Rate:{{currentPrice}} ({{general.country}} {{currentPrice * currencySendForm.value.txtCurrencySendAmountCrypto}})\n          </ion-label> -->\n          <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="send"></ion-icon>\n            </ion-label>\n            <ion-input placeholder="Sending Amount" [disabled]=\'!formActive\' type="number" formControlName="txtCurrencySendAmountCrypto"\n              (keyup)="CalculateMoney()"></ion-input>\n          </ion-item>\n          <ion-label class="label">\n            Commision charge : {{currencySendForm.value.txtFinalCommisionForSend || 0}}\n          </ion-label>\n          <ion-label class="label">\n            Amount to be send : {{currencySendForm.value.txtFinalAmountForSend || 0}}\n          </ion-label>\n          <div class="outerDiv">\n            <button ion-button type="submit" class="customBtn" [hidden]="twoStepActive" [disabled]="!enableBtn">Submit</button>\n          </div>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-send\crypto-currency-send.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__["a" /* AppUtils */]])
    ], CryptoCurrencySendComponent);
    return CryptoCurrencySendComponent;
}());

//# sourceMappingURL=crypto-currency-send.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencySellComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CryptoCurrencySellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CryptoCurrencySellComponent = (function () {
    function CryptoCurrencySellComponent(cryptoService, events, formBuilder, viewCtrl) {
        var _this = this;
        this.cryptoService = cryptoService;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.called = false;
        this.formActive = true;
        this.twoStepActive = false;
        this.sendTo = 'CryptoCurrencySellComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'CryptoCurrencySellComponent') {
                _this.submitDataOnSuccess();
            }
        });
        this.todo = this.formBuilder.group({
            btc: [''],
            transPass: [''],
            payType: [''],
            fee: [''],
            tax: [''],
            total: [''],
        });
    }
    CryptoCurrencySellComponent.prototype.submitDataOnSuccess = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.cryptoService.CryptoSell(this.todo.value).then(function () {
                _this.called = false;
            }, function (error) {
                _this.called = false;
                console.log(error);
            });
        }
    };
    CryptoCurrencySellComponent.prototype.logForm = function () {
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.todo.value);
    };
    CryptoCurrencySellComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.todo.reset();
    };
    CryptoCurrencySellComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CryptoCurrencySellComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-sell',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-sell\crypto-currency-sell.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:4em">SELL CRYPTOCURRENCY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center>\n    SELL BTC\n  </ion-title>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-chip color="primary">\n          <ion-label color="dark">\n            <span class="title">Your Buying Limits</span>\n          </ion-label>\n        </ion-chip>\n        <ion-label class="label">\n          <span class="title"> 10 per 24 hours. You can buy 10 now.</span>\n        </ion-label>\n        <form [formGroup]="todo" (ngSubmit)="logForm()">\n          <ion-item class="formInput">\n            <ion-label>BTC:</ion-label>\n            <ion-input [disabled]=\'!formActive\' type="number" formControlName="btc"></ion-input>\n          </ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col>\n                <ion-title>\n                  <div class="outerDiv" style="color:#000;">\n                    OR\n                  </div>\n                </ion-title>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="INR" [disabled]=\'!formActive\' type="number" formControlName="transPass"></ion-input>\n          </ion-item>\n          <ion-label class="label" style="color:#000;">\n            <div class="outerDiv">At Rs:\n              <b style="color:#000;"> 744354 </b> per BTC\n            </div>\n          </ion-label>\n          <ion-item class="formInput">\n            <ion-label style="color:#000;">Payment Type</ion-label>\n            <ion-select [disabled]=\'!formActive\' formControlName=\'payType\'>\n              <ion-option value="f">INR Balance (Balance: 0)</ion-option>\n              <ion-option value="m">Wallets and Netbanking ( Additional 1.9% processing fee applies)</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="FEE" [disabled]=\'!formActive\' type="number" formControlName="fee"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="TAX" [disabled]=\'!formActive\' type="number" formControlName="tax"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label></ion-label>\n            <ion-input placeholder="Total" [disabled]=\'!formActive\' type="number" formControlName="total"></ion-input>\n          </ion-item>\n          <div class="outerDiv">\n            <button ion-button type="submit" class="customBtn" [hidden]="twoStepActive" [disabled]="!todo.valid">Submit</button>\n          </div>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-sell\crypto-currency-sell.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], CryptoCurrencySellComponent);
    return CryptoCurrencySellComponent;
}());

//# sourceMappingURL=crypto-currency-sell.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyExchangeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the CryptoCurrencyBuyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CryptoCurrencyExchangeComponent = (function () {
    function CryptoCurrencyExchangeComponent(events, formBuilder, viewCtrl, cryptoService, params, general, auth, appUtils) {
        var _this = this;
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.cryptoService = cryptoService;
        this.params = params;
        this.general = general;
        this.auth = auth;
        this.appUtils = appUtils;
        this.formActive = true;
        this.twoStepActive = false;
        this.called = false;
        this.sendTo = 'CryptoCurrencyBuyComponent';
        events.subscribe('twoSF:verified', function (twoSF, component) {
            if (component == 'CryptoCurrencyBuyComponent') {
                _this.submitDataOnSuccess();
            }
        });
        this.exchangeData = {
            ddlToExchangeCurrency: "",
            txtCurrencyExchangeAmountCrypto: 0,
            txtCurrencyExchangeAmount: 0,
            txtFinalAmountForExchange: 0,
            txtFinalCommisionForExchange: 0,
            txtFinalExchangeAmountToConvertedCurrency: 0,
            txtToExchangeAddress: '',
            txtCurrencyExchangeTxs: '',
        };
        this.currencyExchangeForm = this.formBuilder.group({
            txtExchangeTo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            txtAmount: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    }
    CryptoCurrencyExchangeComponent.prototype.ngOnInit = function () {
        if (this.currency) {
            this.selectedCoin = this.currency;
        }
        else
            this.selectedCoin = this.params.get('currency');
        console.log("SelectedCoin::" + JSON.stringify(this.selectedCoin, null, 4));
        //alert(this.selectedCoin.curr_code+", ParamSting::" + JSON.stringify(this.general.liveData, null, 4));    
        for (var _i = 0, _a = this.general.liveData; _i < _a.length; _i++) {
            var coin = _a[_i];
            if (this.selectedCoin.curr_code == 'BCY') {
                this.currentPrice = parseFloat(coin['BTC'][this.general.country]);
            }
            else {
                this.currentPrice = parseFloat(coin[this.selectedCoin.curr_code][this.general.country]);
            }
        }
        this.CalculateMoney();
        //   this.crytoService.CryptoHistory(this.params.get('currency').cur_code).then((data)=>{
        //     console.log("HistoryData::"+JSON.stringify(this.crytoService.CryptoHistory,null,4))
        //   },
        // (error)=>{
        //   alert(error);
        // })
    };
    CryptoCurrencyExchangeComponent.prototype.CalculateMoney = function () {
        //alert("Hlloooo");
        // let feeAmount = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) / 100;
        // let toconvertedexchangeamounttal = (this.currentPrice * this.currencyBuyForm.value.txtCurrencyBuyAmountNew) + feeAmount;
        // let totalInShatoshi = this.currencyBuyForm.value.txtCurrencyBuyAmountNew * Math.pow(10, 8);
        var _this = this;
        var data = { service_type: 'exchange', amount_in_shatoshi: this.currencyExchangeForm.value.txtAmount * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, from_currency: this.selectedCoin.curr_code, exchange_with_currency: this.currencyExchangeForm.value.txtExchangeTo.trim() };
        //let data = { service_type: 'exchange', amount: this.currencyExchangeForm.value.txtAmount * Math.pow(10, 8), wallet_balance: this.selectedCoin.available_balance, fromCurrency: 'BCY', exchangeWith: 'BCY' };
        //console.log("ChangeData" + JSON.stringify(data, null, 4));
        if (this.currencyExchangeForm.value.txtExchangeTo != '' && this.currencyExchangeForm.value.txtAmount > 0) {
            this.cryptoService.CurrencyConversion(data).then(function (res) {
                console.log("Conversion:" + JSON.stringify(res));
                _this.exchangeData.ddlToExchangeCurrency = _this.currencyExchangeForm.value.txtExchangeTo.trim();
                _this.exchangeData.txtCurrencyExchangeAmountCrypto = _this.currencyExchangeForm.value.txtAmount;
                _this.exchangeData.txtCurrencyExchangeAmount = data.amount_in_shatoshi;
                _this.exchangeData.txtFinalAmountForExchange = res.convertedexchangeamount.value;
                _this.exchangeData.txtFinalCommisionForExchange = res.servicecommision.value;
                _this.exchangeData.txtFinalExchangeAmountToConvertedCurrency = res.finalamount.value;
                console.log("Exchange Data:" + JSON.stringify(_this.exchangeData));
            }, function (error) {
                _this.appUtils.ShowToast(error, 'bottom', 6000);
            });
        }
        else {
            // Exchange currency is not selected or Exchange amount is not mentioned.
        }
    };
    CryptoCurrencyExchangeComponent.prototype.logForm = function () {
        this.formActive = false;
        this.twoStepActive = true;
        console.log(this.exchangeData);
    };
    CryptoCurrencyExchangeComponent.prototype.submitDataOnSuccess = function () {
        var _this = this;
        if (!this.called) {
            this.called = true;
            this.appUtils.ShowLoader();
            this.cryptoService.CryptoExchange(this.exchangeData, this.selectedCoin.curr_code).then(function (exRes) {
                //alert("SendTo:"+exRes.send_to_address + ", Txs::"+exRes.currencytxs.currencytxs);
                _this.exchangeData.txtToExchangeAddress = exRes.send_to_address.value;
                _this.exchangeData.txtCurrencyExchangeTxs = JSON.stringify(exRes.currencytxs.transaction_obj);
                _this.cryptoService.CryptoExchangeToAddress(_this.exchangeData, _this.selectedCoin.curr_code).then(function (exToAddrRes) {
                    _this.called = false;
                    _this.appUtils.HideLoader();
                    _this.appUtils.ShowToast(exToAddrRes, 'bottom', 6000);
                    _this.dismiss();
                }, function (error) {
                    _this.called = false;
                    _this.appUtils.HideLoader();
                    _this.appUtils.ShowToast(error, 'bottom', 6000);
                });
            }, function (error) {
                _this.called = false;
                _this.appUtils.HideLoader();
                _this.appUtils.ShowToast(error, 'bottom', 6000);
                console.log(error);
            });
        }
    };
    CryptoCurrencyExchangeComponent.prototype.moveBack = function () {
        this.formActive = true;
        this.twoStepActive = false;
        this.currencyExchangeForm.reset();
    };
    CryptoCurrencyExchangeComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CryptoCurrencyExchangeComponent.prototype, "currency", void 0);
    CryptoCurrencyExchangeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-exchange',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-exchange\crypto-currency-exchange.html"*/'<ion-header *ngIf="!currency">\n  <ion-navbar>\n    <ion-title class="navbarAppHead" style="padding-left:3em">EXCHANGE CRYPTOCURRENCY</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <!-- <span ion-text color="primary" showWhen="ios">Cancel</span> -->\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title text-center color="dark" *ngIf="selectedCoin != undefined">\n    <span style="color:#000">Exchange {{selectedCoin.curr_code}}</span>\n  </ion-title>\n\n  <ion-grid *ngIf="selectedCoin != undefined">\n    <ion-row>\n      <ion-col>\n        <!-- <ion-row class="btcLimitTag">\n          <ion-chip color="primary">\n            <ion-label color="dark">Your Buying Limits\n              <br/>\n              <b>10 per 24 hours. You can buy 10 now.</b>\n            </ion-label>\n          </ion-chip>\n        </ion-row> -->\n        <form [formGroup]="currencyExchangeForm" (ngSubmit)="logForm()">\n          <ion-item class="formInput">\n            <ion-label style="text-align:left;">\n              <ion-icon name="card"></ion-icon>&nbsp;&nbsp;Exchange To\n            </ion-label>\n            <ion-select [disabled]=\'!formActive\' formControlName=\'txtExchangeTo\' name="radPaymentType" (change)="CalculateMoney()">\n              <ng-container *ngFor="let currency of cryptoService.CryptoCurrencies">\n                <ion-option style="color:#fff;" *ngIf="currency.curr_code != selectedCoin.curr_code">\n                  {{currency.curr_code}}\n                </ion-option>\n              </ng-container>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label>Amount:</ion-label>\n            <ion-input [disabled]=\'!formActive\' type="number" formControlName="txtAmount" (keyup)="CalculateMoney()"></ion-input>\n          </ion-item>\n          \n          <ion-label class="label">\n            Commision charge : {{exchangeData.txtFinalCommisionForExchange || 0}}\n          </ion-label>\n          <ion-label class="label">\n            Amount to be transfered :  {{exchangeData.txtFinalExchangeAmountToConvertedCurrency || 0}}\n          </ion-label>\n\n\n\n\n          <!-- <ion-item class="formInput">\n            <ion-label>{{selectedCoin.curr_code}}:</ion-label>\n            <ion-input [disabled]=\'!formActive\' type="number" formControlName="txtCurrencyBuyAmountNew" (keyup)="CalculateMoney()"></ion-input>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label style="text-align:left;">\n              <ion-icon name="card"></ion-icon>&nbsp;&nbsp;Payment Type\n            </ion-label>\n            \n            <ion-select formControlName=\'radPaymentType\' name="radPaymentType">\n              <ion-option style="color:#fff;" [value]="bal" [selected]="currencyBuyForm.value.radPaymentType == \'bal\'">\n                {{general.country}} Balance {{currencyBuyForm.value.radPaymentType}}\n              </ion-option>\n              <ion-option style="color:#fff;" [value]="wallet" [selected]="currencyBuyForm.value.radPaymentType == \'wallet\'">\n                Wallets and Netbanking ( Additional 1.9% processing fee applies)\n              </ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="usd"></ion-icon>&nbsp;&nbsp;FEE:(%)\n            </ion-label>\n            <ion-input type="number" formControlName="txtCurrencyBuyFees" [disabled]=\'true\'></ion-input>\n          </ion-item> -->\n          <!-- <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="albums"></ion-icon>&nbsp;&nbsp;TAX:\n            </ion-label>\n            <ion-input type="number" formControlName="tax" [disabled]=\'!formActive\'></ion-input>\n          </ion-item> -->\n          <!-- <ion-item class="formInput">\n            <ion-label>\n              <ion-icon name="card"></ion-icon>&nbsp;&nbsp;Total:\n            </ion-label>\n            <ion-input type="number" formControlName="txtCurrencyBuyTotal" [disabled]=\'true\'></ion-input>\n            <ion-input type="number" formControlName="txtCurrencyBuyAmount" [hidden]="true" [disabled]=\'true\'></ion-input>\n            <ion-input type="number" formControlName="txtCurrencyBuyFeesTransaction" [hidden]="true" [disabled]=\'true\'></ion-input>\n          </ion-item> -->\n          <div class="outerDiv">\n            <button ion-button type="submit" class="customBtn" [hidden]="twoStepActive" [disabled]="!currencyExchangeForm.valid">\n              Exchange\n            </button>\n          </div>\n          <ion-label class="label">(You will confirm in next step)\n          </ion-label>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid *ngIf=\'twoStepActive\'>\n    <ion-row>\n      <ion-col>\n        <ion-title text-center color="dark">\n          <span style="color:#000">Verify 2-FA password</span>\n        </ion-title>\n        <ion-title>Verify 2-FA password</ion-title>\n        <two-sf [sendTo]="sendTo"></two-sf>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-exchange\crypto-currency-exchange.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__["a" /* AppUtils */]])
    ], CryptoCurrencyExchangeComponent);
    return CryptoCurrencyExchangeComponent;
}());

//# sourceMappingURL=crypto-currency-exchange.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatNavigationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FiatNavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiatNavigationPage = (function () {
    function FiatNavigationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FiatNavigationPage.prototype.ionViewDidLoad = function () {
    };
    FiatNavigationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-fiat-navigation',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\fiat-navigation\fiat-navigation.html"*/'<!--\n  Generated template for the FiatNavigationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>FiatNavigation</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\fiat-navigation\fiat-navigation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], FiatNavigationPage);
    return FiatNavigationPage;
}());

//# sourceMappingURL=fiat-navigation.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SplashPage = (function () {
    function SplashPage(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\splash\splash.html"*/'<ion-content>\n<div class="outerDiv">\n  <div class="load-bar">\n    <div class="bar"></div>\n    <div class="bar"></div>\n    <div class="bar"></div>\n  </div>\n</div>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalletPage = (function () {
    function WalletPage(navCtrl, navParams, cryptoService, appUtils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cryptoService = cryptoService;
        this.appUtils = appUtils;
        this.walletBalance = '0.00000000';
        this.walletBalanceINR = '0';
        this.loading = false;
    }
    WalletPage.prototype.ionViewDidLoad = function () {
    };
    WalletPage.prototype.ngOnInit = function () {
        var _this = this;
        this.assetsUrl = this.appUtils.GetServerUrl();
        this.loading = true;
        this.cryptoService.GetCryptoCurrencyWallets().then(function (res) {
            _this.cryptoService.GetCryptoCurrencies().then(function (res) {
                _this.walletList = _this.cryptoService.CryptoCurrencies;
                _this.loading = false;
                console.log(JSON.stringify(_this.walletList, null, 4));
            }, function (error) {
                _this.loading = false;
                if (error == 'nodata') {
                }
                else {
                    _this.appUtils.ShowToast(error, top, 6000);
                }
                //alert("GetCryptoError::"+error);
            });
        }, function (error) {
            _this.loading = false;
            _this.appUtils.ShowToast(error, top, 6000);
        });
    };
    WalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wallet',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\wallet\wallet.html"*/'<ion-content>\n  <!-- <ion-item>\n    <ion-grid>\n      <ion-row>\n        <ion-col text-center>TOTAL AMOUNT</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <h1 class="coinTotalValue">$450.76</h1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item> -->\n  <ion-item class="ion-item-wallet" text-center>\n    Cryptocurrency Accounts\n  </ion-item>\n  <div *ngIf="!loading">\n    <ion-item class="ion-item-wallet" *ngIf="walletList else emptywallet">\n      <ion-grid>\n        <ion-row>\n          <ion-card class="dashCard" *ngFor="let data of walletList">\n            <ion-card-content>\n              <ion-row>\n                <ion-col col-2>\n                  <img class="center-img" [src]="appUtils.SanitizeUrl(assetsUrl+\'storage/uploads/user_null/\'+data.curr_image)">                  \n                </ion-col>\n                <ion-col col-5>\n                  {{data.curr_name}}\n                </ion-col>\n                <ion-col col-5 text-center>\n                  <span class="coinVal">{{data.available_balance}}</span> {{data.curr_code}}\n                </ion-col>\n              </ion-row>\n            </ion-card-content>\n          </ion-card>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ng-template #emptywallet>No data available. Please try again.</ng-template>\n  </div>\n  <ion-item *ngIf="loading">Loading...</ion-item>\n\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\wallet\wallet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_apputils_apputils__["a" /* AppUtils */]])
    ], WalletPage);
    return WalletPage;
}());

//# sourceMappingURL=wallet.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(390);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_login_login__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_crypto_currency_crypto_currency__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_fiat_currency_fiat_currency__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_fiatCurrency_fiat_dashboard_fiat_dashboard__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_fiatCurrency_fiat_deposit_fiat_deposit__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_fiatCurrency_fiat_withdrawal_fiat_withdrawal__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_cryptoCurrency_crypto_currency_buy_crypto_currency_buy__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_cryptoCurrency_crypto_currency_history_crypto_currency_history__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_cryptoCurrency_crypto_currency_send_crypto_currency_send__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_cryptoCurrency_crypto_currency_sell_crypto_currency_sell__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_staticPages_career_career__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_staticPages_contactus_contactus__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_staticPages_howitworks_howitworks__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_staticPages_support_support__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_staticPages_profile_profile__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_wallet_wallet__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_fiat_navigation_fiat_navigation__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_coin_status_coin_status__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_two_step_verification_two_step_verification__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_introduction_introduction__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_cryptoCurrency_crypto_currency_dashboard_crypto_currency_dashboard__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_file__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_transfer__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_file_path__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_camera__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_signup_signup__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_spinner_spinner__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_verify_pin_verify_pin__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_modal_modal__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_two_sf_two_sf__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_bank_details_bank_details__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_kyc_details_kyc_details__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_entrypage_entrypage__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_splash_splash__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__angular_common_http__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pipes_key_value_key_value__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_currencyaddress_currencyaddress__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__components_fiatCurrency_fiat_history_fiat_history__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_fiat_fiat__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__components_cryptoCurrency_crypto_currency_exchange_crypto_currency_exchange__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__components_copycurrencyaddressmodal_copycurrencyaddressmodal__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_clipboard__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__components_currencytradegraph_currencytradegraph__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_settings_settings__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_changepin_changepin__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__components_chart_chart__ = __webpack_require__(725);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_wallet_wallet__["a" /* WalletPage */],
                __WEBPACK_IMPORTED_MODULE_43__components_modal_modal__["a" /* ModalComponent */],
                __WEBPACK_IMPORTED_MODULE_44__components_two_sf_two_sf__["a" /* TwoSfComponent */],
                __WEBPACK_IMPORTED_MODULE_47__pages_entrypage_entrypage__["a" /* EntrypagePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_46__components_kyc_details_kyc_details__["a" /* KycDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_45__components_bank_details_bank_details__["a" /* BankDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_coin_status_coin_status__["a" /* CoinStatusComponent */],
                __WEBPACK_IMPORTED_MODULE_32__pages_introduction_introduction__["a" /* IntroductionPage */],
                __WEBPACK_IMPORTED_MODULE_31__components_two_step_verification_two_step_verification__["a" /* TwoStepVerificationComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_signup_signup__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_40__components_spinner_spinner__["a" /* SpinnerComponent */],
                __WEBPACK_IMPORTED_MODULE_41__components_verify_pin_verify_pin__["a" /* VerifyPinComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_login_login__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_staticPages_career_career__["a" /* CareerComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_staticPages_contactus_contactus__["a" /* ContactusComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_staticPages_howitworks_howitworks__["a" /* HowitworksComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_staticPages_support_support__["a" /* SupportComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_staticPages_profile_profile__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_15__pages_fiat_currency_fiat_currency__["a" /* FiatCurrencyPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_fiat_navigation_fiat_navigation__["a" /* FiatNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_fiatCurrency_fiat_dashboard_fiat_dashboard__["a" /* FiatDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_fiatCurrency_fiat_deposit_fiat_deposit__["a" /* FiatDepositComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_fiatCurrency_fiat_withdrawal_fiat_withdrawal__["a" /* FiatWithdrawalComponent */],
                __WEBPACK_IMPORTED_MODULE_53__components_fiatCurrency_fiat_history_fiat_history__["a" /* FiatHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_14__pages_crypto_currency_crypto_currency__["a" /* CryptoCurrencyPage */],
                __WEBPACK_IMPORTED_MODULE_34__components_cryptoCurrency_crypto_currency_dashboard_crypto_currency_dashboard__["a" /* CryptoCurrencyDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_cryptoCurrency_crypto_currency_buy_crypto_currency_buy__["a" /* CryptoCurrencyBuyComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_cryptoCurrency_crypto_currency_sell_crypto_currency_sell__["a" /* CryptoCurrencySellComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_cryptoCurrency_crypto_currency_send_crypto_currency_send__["a" /* CryptoCurrencySendComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_cryptoCurrency_crypto_currency_history_crypto_currency_history__["a" /* CryptoCurrencyHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_56__components_cryptoCurrency_crypto_currency_exchange_crypto_currency_exchange__["a" /* CryptoCurrencyExchangeComponent */],
                __WEBPACK_IMPORTED_MODULE_51__pipes_key_value_key_value__["a" /* KeyValuePipe */],
                __WEBPACK_IMPORTED_MODULE_52__pages_currencyaddress_currencyaddress__["a" /* CurrencyaddressPage */],
                __WEBPACK_IMPORTED_MODULE_57__components_copycurrencyaddressmodal_copycurrencyaddressmodal__["a" /* CopycurrencyaddressmodalComponent */],
                __WEBPACK_IMPORTED_MODULE_59__components_currencytradegraph_currencytradegraph__["a" /* CurrencytradegraphComponent */],
                __WEBPACK_IMPORTED_MODULE_60__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_61__components_changepin_changepin__["a" /* ChangepinComponent */],
                __WEBPACK_IMPORTED_MODULE_62__components_chart_chart__["a" /* ChartComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_42__angular_forms__["b" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_42__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_50__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/crypto-currency/crypto-currency.module#CryptoCurrencyPageModule', name: 'CryptoCurrencyPage', segment: 'crypto-currency', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fiat-currency/fiat-currency.module#FiatCurrencyPageModule', name: 'FiatCurrencyPage', segment: 'fiat-currency', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fiat-navigation/fiat-navigation.module#FiatNavigationPageModule', name: 'FiatNavigationPage', segment: 'fiat-navigation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/currencyaddress/currencyaddress.module#CurrencyaddressPageModule', name: 'CurrencyaddressPage', segment: 'currencyaddress', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/introduction/introduction.module#IntroductionPageModule', name: 'IntroductionPage', segment: 'introduction', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/entrypage/entrypage.module#EntrypagePageModule', name: 'EntrypagePage', segment: 'entrypage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wallet/wallet.module#WalletPageModule', name: 'WalletPage', segment: 'wallet', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_wallet_wallet__["a" /* WalletPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_43__components_modal_modal__["a" /* ModalComponent */],
                __WEBPACK_IMPORTED_MODULE_44__components_two_sf_two_sf__["a" /* TwoSfComponent */],
                __WEBPACK_IMPORTED_MODULE_47__pages_entrypage_entrypage__["a" /* EntrypagePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_46__components_kyc_details_kyc_details__["a" /* KycDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_45__components_bank_details_bank_details__["a" /* BankDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_coin_status_coin_status__["a" /* CoinStatusComponent */],
                __WEBPACK_IMPORTED_MODULE_32__pages_introduction_introduction__["a" /* IntroductionPage */],
                __WEBPACK_IMPORTED_MODULE_31__components_two_step_verification_two_step_verification__["a" /* TwoStepVerificationComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_signup_signup__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_40__components_spinner_spinner__["a" /* SpinnerComponent */],
                __WEBPACK_IMPORTED_MODULE_41__components_verify_pin_verify_pin__["a" /* VerifyPinComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_login_login__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_staticPages_career_career__["a" /* CareerComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_staticPages_contactus_contactus__["a" /* ContactusComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_staticPages_howitworks_howitworks__["a" /* HowitworksComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_staticPages_support_support__["a" /* SupportComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_staticPages_profile_profile__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_15__pages_fiat_currency_fiat_currency__["a" /* FiatCurrencyPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_fiat_navigation_fiat_navigation__["a" /* FiatNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_fiatCurrency_fiat_dashboard_fiat_dashboard__["a" /* FiatDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_fiatCurrency_fiat_deposit_fiat_deposit__["a" /* FiatDepositComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_fiatCurrency_fiat_withdrawal_fiat_withdrawal__["a" /* FiatWithdrawalComponent */],
                __WEBPACK_IMPORTED_MODULE_53__components_fiatCurrency_fiat_history_fiat_history__["a" /* FiatHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_14__pages_crypto_currency_crypto_currency__["a" /* CryptoCurrencyPage */],
                __WEBPACK_IMPORTED_MODULE_34__components_cryptoCurrency_crypto_currency_dashboard_crypto_currency_dashboard__["a" /* CryptoCurrencyDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_cryptoCurrency_crypto_currency_buy_crypto_currency_buy__["a" /* CryptoCurrencyBuyComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_cryptoCurrency_crypto_currency_sell_crypto_currency_sell__["a" /* CryptoCurrencySellComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_cryptoCurrency_crypto_currency_send_crypto_currency_send__["a" /* CryptoCurrencySendComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_cryptoCurrency_crypto_currency_history_crypto_currency_history__["a" /* CryptoCurrencyHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_56__components_cryptoCurrency_crypto_currency_exchange_crypto_currency_exchange__["a" /* CryptoCurrencyExchangeComponent */],
                __WEBPACK_IMPORTED_MODULE_52__pages_currencyaddress_currencyaddress__["a" /* CurrencyaddressPage */],
                __WEBPACK_IMPORTED_MODULE_57__components_copycurrencyaddressmodal_copycurrencyaddressmodal__["a" /* CopycurrencyaddressmodalComponent */],
                __WEBPACK_IMPORTED_MODULE_59__components_currencytradegraph_currencytradegraph__["a" /* CurrencytradegraphComponent */],
                __WEBPACK_IMPORTED_MODULE_60__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_61__components_changepin_changepin__["a" /* ChangepinComponent */],
                __WEBPACK_IMPORTED_MODULE_62__components_chart_chart__["a" /* ChartComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_50__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */],
                __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__providers_authenticate_authenticate__["a" /* AuthenticateProvider */],
                __WEBPACK_IMPORTED_MODULE_49__providers_general_general__["a" /* GeneralProvider */],
                __WEBPACK_IMPORTED_MODULE_54__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */],
                __WEBPACK_IMPORTED_MODULE_55__providers_fiat_fiat__["a" /* FiatProvider */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_clipboard__["a" /* Clipboard */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, platform, navParams, menuCtrl) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.login = true;
        this.signup = false;
        this.forgetPassword = false;
        this.pinVerification = false;
        if (localStorage.getItem('userData') != null) {
            this.pinVerification = true;
        }
        else if (this.navParams.get('data') == "login") {
            this.login = true;
            this.signup = false;
            this.forgetPassword = false;
            this.pinVerification = false;
        }
        else {
            this.signup = true;
            this.login = false;
            this.forgetPassword = false;
            this.pinVerification = false;
        }
    }
    HomePage.prototype.back = function () {
        if (this.forgetPassword) {
            this.forgetPassword = false;
            this.login = true;
        }
        else if (this.navParams.get('data1') == "register") {
            this.navCtrl.pop();
        }
        else if (this.signup) {
            this.signup = false;
            this.login = true;
        }
        else if (this.navParams.get('data') == "login") {
            this.navCtrl.pop();
        }
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.exitApp = function () {
        this.platform.exitApp();
    };
    HomePage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menuCtrl.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\home\home.html"*/'<ion-header>\n  <ion-toolbar class="homeToolbar">\n    <div class="backBtnToolbar" *ngIf="!pinVerification">\n      <ion-icon name="arrow-round-back" class="customBackBtn" float-left (click)="back()"></ion-icon>\n    </div>\n    <div class="restToolbar" *ngIf="!pinVerification">\n      <ion-title *ngIf="login && !forgetPassword && !pinVerification">LOGIN</ion-title>\n      <ion-title *ngIf="signup">REGISTER</ion-title>\n      <ion-title *ngIf="forgetPassword">FORGET PASSWORD</ion-title>\n    </div>\n    <ion-title *ngIf="pinVerification" class="navbarAppHead" style="padding-left:4em">PIN VERIFICATION</ion-title>\n    <ion-buttons *ngIf="pinVerification" end>\n      <button ion-button icon-only (click)="exitApp()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <div [hidden]="!login">\n    <login></login>\n  </div>\n  <div [hidden]="!signup">\n    <signup></signup>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_staticPages_profile_profile__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_staticPages_howitworks_howitworks__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_introduction_introduction__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_kyc_details_kyc_details__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_entrypage_entrypage__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = (function () {
    function MyApp(auth, events, platform, statusBar, splashScreen, appUtils) {
        var _this = this;
        this.auth = auth;
        this.events = events;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.appUtils = appUtils;
        // rootPage: any = CareerComponent;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_entrypage_entrypage__["a" /* EntrypagePage */];
        this.link = 'http://valuebit.lokhittrust.in/storage/uploads/user_';
        events.subscribe('user:created', function (user, time) {
            _this.loggedInUserName = user.user_name;
            _this.loggedInUserImage = user.user_image;
        });
        this.initializeApp();
        this.pages = [
            { title: 'PROFILE', component: __WEBPACK_IMPORTED_MODULE_4__components_staticPages_profile_profile__["a" /* ProfileComponent */], imgLink: 'contact' },
            { title: 'UPDATE KYC', component: __WEBPACK_IMPORTED_MODULE_8__components_kyc_details_kyc_details__["a" /* KycDetailsComponent */], imgLink: 'list-box' },
            { title: 'ACCOUNT SETTINGS', component: __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */], imgLink: 'cog' },
            { title: 'HOW IT WORKS', component: __WEBPACK_IMPORTED_MODULE_5__components_staticPages_howitworks_howitworks__["a" /* HowitworksComponent */], imgLink: 'information-circle' },
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
    MyApp.prototype.UploadProfile = function () {
        var _this = this;
        this.auth.UploadUserImage('profile').then(function (res) {
            //this.getImagePath();
            // alert("ImageName:"+this.auth.uploadImagePath);
            //this.appUtils.ShowToast("Profile image updated!", "bottom",6000);
            // alert("UploadedImageName:"+res);
            _this.auth.userData.user_image = res;
        }, function (error) {
            _this.appUtils.ShowToast(error, 'bottom', 6000);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        //  alert("initialize app");
        console.log("into app componet ts file");
        //  console.log(this.auth.userData.user_image);
        this.platform.ready().then(function () {
            if (localStorage.getItem('userData') != null && localStorage.getItem('token')) {
                // alert("InitializeData"+localStorage.getItem('token'));
                _this.auth.setToken(localStorage.getItem('token'));
                _this.auth.userData = JSON.parse(localStorage.getItem('userData'));
                //let temp = JSON.parse(localStorage.getItem('userData'));
                // this.auth.getUserData().then(() => {
                //    this.user_image=  this.auth.userData.user_name;
                // });
                _this.loggedInUserName = _this.auth.userData.user_name;
                _this.loggedInUserImage = _this.link + _this.loggedInUserName + '/' + _this.auth.userData.user_image;
                console.log(_this.auth.userData.user_image);
                console.log(_this.loggedInUserImage);
                _this.splashScreen.hide();
            }
            else {
                // alert("User not available")
                if (localStorage.getItem('firstLaunch') == 'Done') {
                    _this.statusBar.styleDefault();
                    _this.splashScreen.hide();
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_introduction_introduction__["a" /* IntroductionPage */];
                    localStorage.setItem('firstLaunch', 'Done');
                    _this.statusBar.styleDefault();
                    _this.splashScreen.hide();
                }
            }
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // alert("inAppComponent:OpenPage")
        if (page.component) {
            this.nav.push(page.component);
        }
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            this.auth.loggedIn = false;
            setTimeout(function () {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_entrypage_entrypage__["a" /* EntrypagePage */]);
            }, 200);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <ion-grid class="profileGrid">\n        <ion-row>\n          <ion-col col-12>\n            <div class="outerDiv">\n              <ion-avatar item-start class="profileImage" *ngIf="auth.userData != null">\n                <span class="editProfile" (click)="UploadProfile()" menuClose="left">\n                  <i class="fa fa-2x fa-pencil"></i>\n                </span>\n                <div *ngIf="auth.userData.user_image !== \'no-image.png\' && auth.userData.user_image != null"><img class="menu-profile-img" [src]="appUtils.SanitizeUrl(assetsUrl+\'storage/uploads/user_\' + auth.userData.user_name + \'/\'+auth.userData.user_image)" onerror ="this.src=\'assets/imgs/user.png\'"></div>\n                <div *ngIf="auth.userData.user_image == undefined || auth.userData.user_image == \'no-image.png\' || auth.userData.user_image == null" ><img class="avtar profileImageTag" src="assets/imgs/user.png"></div>\n              </ion-avatar>\n            </div>\n          </ion-col>\n          <ion-col col-12>\n            <div class="outerDiv">\n              <ion-title text-center>{{loggedInUserName}}</ion-title>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <div class="menuLinks">\n        <button class="menuBtn" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          <ion-icon name="{{p.imgLink}}"></ion-icon>\n          {{p.title}}\n        </button>\n      </div>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_10__providers_apputils_apputils__["a" /* AppUtils */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { GooglePlus } from '@ionic-native/google-plus';





var LoginComponent = (function () {
    function LoginComponent(events, pnkHttpService, home, auth, homePage, formBuilder, navCtrl) {
        this.events = events;
        this.pnkHttpService = pnkHttpService;
        this.home = home;
        this.auth = auth;
        this.homePage = homePage;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.passwordType = 'password';
        this.forgetPass = false;
        this.formNotSubmitted = true;
        this.isLoggedIn = false;
        this.forgetPasswordEmailSent = false;
        this.loginForm = this.formBuilder.group({
            txtLoginUsername: ['', ''],
            pwdLoginPassword: ['', '']
        });
        this.forgetPasswordForm = this.formBuilder.group({
            txtForgetPasswordUserEmail: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
                ])],
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('userData') != null && localStorage.getItem('token') != null) {
            //this.auth.setToken(localStorage.getItem('token'));
            // alert("UserDatatypeAtLogin:"+typeof localStorage.getItem('userData'));
            //this.auth.userData = localStorage.getItem('userData');
            this.auth.spinner();
            this.auth.appInit().then(function () {
                _this.auth.spinnerEnable.dismiss();
                if (_this.auth.userData != null) {
                    _this.auth.loggedIn = true;
                    _this.home.pinVerification = true;
                    if (_this.auth.userData.userfourdigitpinstatus == 1) {
                        _this.auth.userPinSetStatus = true;
                    }
                    else {
                        _this.auth.userPinSetStatus = false;
                    }
                }
                else {
                }
            }, function (error) {
                // localStorage.clear();
                _this.auth.spinnerEnable.dismiss();
                _this.auth.loggedIn = false;
                _this.home.pinVerification = false;
                //this.auth.spinnerEnable.dismiss();
                _this.auth.toastDesignClass = 'error';
                _this.auth.toastMsg = error;
                _this.auth.toast();
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
    };
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
    LoginComponent.prototype.loginByEmailFormSubmit = function () {
        var _this = this;
        if ((this.loginForm.value.txtLoginUsername != '') && (this.loginForm.value.pwdLoginPassword != '')) {
            this.auth.spinner();
            this.auth.Login(this.loginForm.value).then(function () {
                _this.auth.loggedIn = true;
                _this.auth.spinnerEnable.dismiss();
                _this.home.pinVerification = true;
                _this.events.publish('user:created', _this.auth.userData, Date.now());
            }, function (error) {
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastDesignClass = 'error';
                _this.auth.toastMsg = error;
                _this.auth.toast();
            });
        }
        else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'User Name or password field Empty';
            this.auth.toast();
        }
    };
    LoginComponent.prototype.forgetPassword = function () {
        this.homePage.forgetPassword = !this.homePage.forgetPassword;
        this.forgetPass = !this.forgetPass;
    };
    LoginComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.forgetPasswordForm.value.txtForgetPasswordUserEmail != '') {
            this.auth.spinner();
            this.auth.ResetPasswordByEmail(this.forgetPasswordForm.value).then(function () {
                _this.auth.spinnerEnable.dismiss();
                _this.forgetPasswordEmailSent = true;
                _this.auth.toastDesignClass = 'success';
                _this.auth.toast();
                _this.forgetPassword();
            }, function (error) {
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastDesignClass = 'error';
                _this.auth.toastMsg = error;
                _this.auth.toast();
            });
        }
        else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'Field is Empty';
            this.auth.toast();
        }
    };
    LoginComponent.prototype.resendResetLink = function () {
        var _this = this;
        if (this.forgetPasswordForm.value.txtForgetPasswordUserEmail != '') {
            this.auth.spinner();
            this.auth.ResetPasswordByEmail(this.forgetPasswordForm.value).then(function () {
                _this.auth.spinnerEnable.dismiss();
                _this.forgetPasswordEmailSent = true;
                _this.auth.toastDesignClass = 'success';
                _this.auth.toast();
            }, function (error) {
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastDesignClass = 'error';
                _this.auth.toastMsg = error;
                _this.auth.toast();
            });
        }
        else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'Field is Empty';
            this.auth.toast();
        }
    };
    LoginComponent.prototype.signup = function () {
        this.homePage.signup = true;
        this.homePage.login = false;
    };
    LoginComponent.prototype.togglePasswordView = function () {
        if (this.passwordType == 'password') {
            this.passwordType = 'text';
        }
        else {
            this.passwordType = 'password';
        }
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'login',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\login\login.html"*/'<div class="outterMostDiv">\n    <ion-grid>\n        <ion-row *ngIf="!auth.loggedIn && !home.forgetPassword">\n            <ion-col class="ionicLogoOuter">\n                <div class="logoOuter">\n                    <img src="assets/imgs/logo2.png" class="logo" />\n                </div>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="!auth.loggedIn && !home.forgetPassword">\n            <ion-col class="logoHeader">\n                Valuebit\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="home.forgetPassword">\n            <ion-col class="ionicLogoOuter">\n                <div class="logoOuter logoForgetPass">\n                    <img src="assets/imgs/forget-passwrd-logo.png" class="logo" />\n                </div>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="home.forgetPassword">\n            <ion-col class="logoSubHeader logoHeader">\n                Forgot Your\n                <br/> Password?\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <ion-list *ngIf="!auth.loggedIn && !home.forgetPassword" class="login-list">\n                    <form [formGroup]="loginForm" (ngSubmit)="loginByEmailFormSubmit()">\n                        <ion-item class="formInput">\n                            <ion-label color="primary">\n                                <ion-icon class="IonIcon" name="ios-person-outline"></ion-icon>\n                            </ion-label>\n                            <ion-input type="email" placeholder="Username" formControlName="txtLoginUsername"></ion-input>\n                        </ion-item>\n                        <ion-item class="formInput">\n                            <ion-label color="primary">\n                                <ion-icon class="IonIcon" name="ios-unlock-outline"></ion-icon>\n                            </ion-label>\n                            <ion-input type={{passwordType}} placeholder="Password" formControlName="pwdLoginPassword"></ion-input>\n                        </ion-item>\n                        <ion-grid class="loginBtnGrid">\n                            <ion-row>\n                                <ion-col class="loginBtnGrid">\n                                    <button ion-button round outline [disabled]="!loginForm.valid" full class="loginBtn">Login</button>\n                                    <!--button ion-button round outline type="button" (click)="signup()">Sign up</button -->\n                                </ion-col>\n                            </ion-row>\n                            <ion-row>\n                                <ion-col>\n                                    <ion-title *ngIf="!forgetPasswordEmailSent">\n                                        <span (click)="forgetPassword()" class="forgetPassBtnLogin forgetPassword"> Forget your password?</span>\n                                    </ion-title>\n                                    <ion-title *ngIf="forgetPasswordEmailSent">\n                                        <span (click)="resendResetLink()" class=" forgetPassBtnLogin forgetPassword"> Resend the reset Link.</span>\n                                    </ion-title>\n                                </ion-col>\n                            </ion-row>\n                            <!-- <ion-row>\n                                <ion-col style="padding: 20px 0px;">\n                                    <div class="hr_behind_text">\n                                        Or Login with\n                                    </div>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row>\n                                <ion-col class="socialMediaLoginIconsOuter">\n                                    <span class="socila-circle fa fa-facebook"></span>\n                                    <span class="socila-circle fa fa-google-plus"></span>\n                                    <span class="socila-circle fa fa-linkedin"></span>\n                                    <span class="socila-circle fa fa-twitter"></span>\n                                </ion-col>\n                            </ion-row> -->\n                            <ion-row>\n                                <ion-col>\n                                    <span class="btnRegsiterLink" (click)="signup()">Register here to get started</span>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </form>\n                </ion-list>\n                <ion-list *ngIf="home.forgetPassword" class="login-list">\n                    <form [formGroup]="forgetPasswordForm" (ngSubmit)="resetPassword()">\n                        <ion-item class="formInput">\n                            <ion-input type="email" placeholder="Type your email" formControlName="txtForgetPasswordUserEmail"></ion-input>\n                        </ion-item>\n                        <ion-grid>\n                            <ion-row>\n                                <ion-col>\n                                    <button ion-button round outline [disabled]="!forgetPasswordForm.valid" class="forgetPasswordBtn" full>Send&nbsp;&nbsp;\n                                        <ion-icon name="mail"></ion-icon>\n                                    </button>\n                                    <!--button ion-button round outline type="button" (click)="forgetPassword()">Cancel</button-->\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </form>\n                </ion-list>\n                <div *ngIf="home.pinVerification">\n                    <verify-pin></verify-pin>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</div>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fiat_deposit_fiat_deposit__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_fiat_currency_fiat_currency__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fiat_withdrawal_fiat_withdrawal__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fiat_history_fiat_history__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FiatDashboardComponent = (function () {
    function FiatDashboardComponent(nav, fiatPage, modalCtrl) {
        this.nav = nav;
        this.fiatPage = fiatPage;
        this.modalCtrl = modalCtrl;
    }
    FiatDashboardComponent.prototype.Goto = function (val) {
        if (val == 'deposit') {
            //this.nav.push(FiatNavigationPage,{data:'deposit'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__fiat_deposit_fiat_deposit__["a" /* FiatDepositComponent */], { userId: 8675309 });
            profileModal.present();
        }
        else if (val == 'withdraw') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__fiat_withdrawal_fiat_withdrawal__["a" /* FiatWithdrawalComponent */], { userId: 8675309 });
            profileModal.present();
        }
        else if (val == 'history') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__fiat_history_fiat_history__["a" /* FiatHistoryComponent */], { userId: 8675309 });
            profileModal.present();
        }
        //this.fiatPage.fiatWithdraw = true;
    };
    FiatDashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'fiat-dashboard',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-dashboard\fiat-dashboard.html"*/'<ion-card class="cardBackground">\n  <ion-card-content>\n    <ion-row>\n      <ion-col col-2 class="icon-container btc">\n        <img class="coinIcon" src="assets/imgs/cryptoicn/btc.png">\n      </ion-col>\n      <ion-col col-10 text-center>\n        <ion-row>\n          <ion-col>\n            <div style="float:right;">00000000</div>\n          </ion-col>\n        </ion-row>\n        <!--ion-row>\n          <ion-col>\n            <div>BitCoin</div>\n          </ion-col>\n        </ion-row-->\n        <ion-row>\n          <ion-col col-12>\n            <button class="btnHistory" ion-button small outline text-center (click)="Goto(\'history\')">History</button>\n            <button class="btnWithdrawl" ion-button small outline text-center (click)="Goto(\'withdraw\')">Withdraw</button>\n            <button class="btnDeposit" ion-button small outline text-center (click)="Goto(\'deposit\')">Deposit</button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-card-content>\n</ion-card>\n<ion-card class="cardBackground">\n  <ion-card-content>\n    <ion-row>\n      <ion-col col-2 class="icon-container dash">\n        <img class="coinIcon" src="assets/imgs/cryptoicn/dash.png">\n      </ion-col>\n      <ion-col col-10 text-center>\n        <ion-row>\n          <ion-col>\n            <div style="float:right;">00000000</div>\n          </ion-col>\n        </ion-row>\n        <!--ion-row>\n            <ion-col>\n              <div>Ethereum</div>\n            </ion-col>\n          </ion-row-->\n        <ion-row>\n          <ion-col col-12>\n            <button class="btnHistory" ion-button small outline text-center (click)="Goto(\'history\')">History</button>\n            <button class="btnWithdrawl" ion-button small outline text-center (click)="Goto(\'withdraw\')">Withdraw</button>\n            <button class="btnDeposit" ion-button small outline text-center (click)="Goto(\'deposit\')">Deposit</button>\n\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-card-content>\n</ion-card>\n<ion-card class="cardBackground">\n  <ion-card-content>\n    <ion-row>\n      <ion-col col-2 class="icon-container doge">\n        <img class="coinIcon" src="assets/imgs/cryptoicn/doge.png">\n      </ion-col>\n      <ion-col col-10 text-center>\n        <ion-row>\n          <ion-col>\n            <div style="float:right;">00000000</div>\n          </ion-col>\n        </ion-row>\n        <!--ion-row>\n              <ion-col>\n                <div>Litecoin</div>\n              </ion-col>\n            </ion-row-->\n        <ion-row>\n          <ion-col col-12>\n            <button class="btnHistory" ion-button small outline text-center (click)="Goto(\'history\')">History</button>\n            <button class="btnWithdrawl" ion-button small outline text-center (click)="Goto(\'withdraw\')">Withdraw</button>\n            <button class="btnDeposit" ion-button small outline text-center (click)="Goto(\'deposit\')">Deposit</button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-card-content>\n</ion-card>\n<ion-card class="cardBackground">\n  <ion-card-content>\n    <ion-row>\n      <ion-col col-2 class="icon-container eth">\n        <img class="coinIcon" src="assets/imgs/cryptoicn/eth.png">\n      </ion-col>\n      <ion-col col-10 text-center>\n        <ion-row>\n          <ion-col>\n            <div style="float:right;">00000000</div>\n          </ion-col>\n        </ion-row>\n        <!--ion-row>\n              <ion-col>\n                <div>Dash</div>\n              </ion-col>\n            </ion-row-->\n        <ion-row>\n          <ion-col col-12>\n            <button class="btnHistory" ion-button small outline text-center (click)="Goto(\'history\')">History</button>\n            <button class="btnWithdrawl" ion-button small outline text-center (click)="Goto(\'withdraw\')">Withdraw</button>\n            <button class="btnDeposit" ion-button small outline text-center (click)="Goto(\'deposit\')">Deposit</button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-card-content>\n</ion-card>\n<ion-card class="cardBackground">\n  <ion-card-content>\n    <ion-row>\n      <ion-col col-2 class="icon-container ltc">\n        <img class="coinIcon" src="assets/imgs/cryptoicn/ltc.png">\n      </ion-col>\n      <ion-col col-10 text-center>\n        <ion-row>\n          <ion-col>\n            <div style="float:right;">00000000</div>\n          </ion-col>\n        </ion-row>\n        <!--ion-row>\n              <ion-col>\n                <div>Dogecoin</div>\n              </ion-col>\n            </ion-row-->\n        <ion-row>\n          <ion-col col-12>\n            <button class="btnHistory" ion-button small outline text-center (click)="Goto(\'history\')">History</button>\n            <button class="btnWithdrawl" ion-button small outline text-center (click)="Goto(\'withdraw\')">Withdraw</button>\n            <button class="btnDeposit" ion-button small outline text-center (click)="Goto(\'deposit\')">Deposit</button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-card-content>\n</ion-card>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\fiatCurrency\fiat-dashboard\fiat-dashboard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__pages_fiat_currency_fiat_currency__["a" /* FiatCurrencyPage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], FiatDashboardComponent);
    return FiatDashboardComponent;
}());

//# sourceMappingURL=fiat-dashboard.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CareerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the CareerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CareerComponent = (function () {
    function CareerComponent() {
        console.log('Hello CareerComponent Component');
        this.text = 'Hello World';
    }
    CareerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'career',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\career\career.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="navbarAppHead" style="padding-right:4em">CAREER</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-title class="careerTitle">\n          <h1>Our Openings</h1>\n        </ion-title>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div class="card-content-career">\n    <div class="insideDivCard">\n      <ion-card>\n        <ion-card-content>\n          <ion-row>\n            <ion-col col-3>\n              <img src="assets/career/career1.png" />\n            </ion-col>\n            <ion-col col-9>\n              <ion-row>\n                <h2>Customer Support</h2>\n              </ion-row>\n              <ion-row>\n                <ion-col><h4><ion-icon name="pin"></ion-icon> &nbsp;&nbsp;Singapore</h4></ion-col>\n                <ion-col><h4><ion-icon name="time"></ion-icon>&nbsp;&nbsp;Time</h4></ion-col>\n              </ion-row>\n              <!-- <ion-row>\n                <ion-col col-12 align-items-center>\n                  <button class="careerBtn" ion-button small outline text-center (click)="Goto(\'withdraw\')">Appy Now</button>\n                </ion-col>\n              </ion-row> -->\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n      </ion-card>\n      <ion-card>\n        <ion-card-content>\n          <ion-row>\n            <ion-col col-3>\n              <img src="assets/career/career2.png" />\n            </ion-col>\n            <ion-col col-9>\n              <ion-row>\n                <h2>Database Administrator</h2>\n              </ion-row>\n              <ion-row>\n                  <ion-col><h4><ion-icon name="pin"></ion-icon> &nbsp;&nbsp;Singapore</h4></ion-col>\n                  <ion-col><h4><ion-icon name="time"></ion-icon>&nbsp;&nbsp;Time</h4></ion-col>\n              </ion-row>\n              <!-- <ion-row>\n                <ion-col col-12 align-items-center>\n                  <button class="careerBtn" ion-button small outline text-center (click)="Goto(\'withdraw\')">Appy Now</button>\n                </ion-col>\n              </ion-row> -->\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n      </ion-card>\n      <ion-card>\n        <ion-card-content>\n          <ion-row>\n            <ion-col col-3>\n              <img src="assets/career/career3.png" />\n            </ion-col>\n            <ion-col col-9>\n              <ion-row>\n                <h2>KYC Executive</h2>\n              </ion-row>\n              <ion-row>\n                  <ion-col><h4><ion-icon name="pin"></ion-icon> &nbsp;&nbsp;Singapore</h4></ion-col>\n                  <ion-col><h4><ion-icon name="time"></ion-icon>&nbsp;&nbsp;Time</h4></ion-col>\n              </ion-row>\n              <!-- <ion-row>\n                <ion-col col-12 align-items-center>\n                  <button class="careerBtn" ion-button small outline text-center (click)="Goto(\'withdraw\')">Appy Now</button>\n                </ion-col>\n              </ion-row> -->\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n      </ion-card>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\career\career.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], CareerComponent);
    return CareerComponent;
}());

//# sourceMappingURL=career.js.map

/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ContactusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ContactusComponent = (function () {
    function ContactusComponent(formBuilder, generalservice, navCtrl) {
        this.formBuilder = formBuilder;
        this.generalservice = generalservice;
        this.navCtrl = navCtrl;
        console.log('Hello ContactusComponent Component');
        this.text = 'Hello World';
        this.contactusform = this.formBuilder.group({
            txtfirstName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            txtLastName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            txtEmail: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
                ])],
            txtPhone: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(7), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            txtMessage: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        });
    }
    ContactusComponent.prototype.ContactUs = function (formvalue) {
        var _this = this;
        // alert(JSON.stringify(formvalue));
        // console.log("into the ts file");
        this.generalservice.SaveContactUs().then(function (res) {
            if (res) {
                // alert(res);
                _this.succesmsg = _this.generalservice.succussres;
                _this.generalservice.toastDesignClass = 'success';
                _this.generalservice.toastMsg = _this.succesmsg;
                _this.generalservice.toast();
                setTimeout(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__["a" /* DashboardPage */]);
                }, 5000);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ContactusComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'contactus',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\contactus\contactus.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact Us\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-card>\n        <ion-card-header>\n          <ion-row>\n            <ion-col col-3>\n              <img style="height: 5rem; float: left; width: 5rem;" src="http://valuebit.lokhittrust.in/public/images/home/star&moon.png">\n            </ion-col>\n            <ion-col>\n              <ion-title>\n                <span style="color: #000">Singapore</span>\n              </ion-title>\n            </ion-col>\n          </ion-row>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-row>\n            <ion-col>\n              <p>Valuebit International Ventures Pte. Ltd. </p>\n              <p>82 Genting Lane,</p>\n              <p> #02-07, Media Centre,</p>\n              <p>Singapore (349567)</p>\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n        <!-- </ion-card>\n    </ion-row>\n    <ion-row>\n      <ion-card> -->\n        <ion-card-header>\n          <ion-row>\n            <ion-col col-3>\n              <img style="height: 5rem; float: left; width: 5rem;" src="http://valuebit.lokhittrust.in/public/images/home/indian-flag.png">\n            </ion-col>\n            <ion-col>\n              <ion-title>\n                <span style="color: #000">India</span>\n              </ion-title>\n            </ion-col>\n          </ion-row>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-row>\n            <ion-col>\n              <p>Valuebit It Services Private Limited.</p>\n              <p>A101 Sector 63,</p>\n              <p> Noida,India-201301</p>\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n      </ion-card>\n    </ion-row>\n    <ion-row>\n      <ion-card>\n        <!-- <ion-card-header>\n          <ion-title >\n            <span style="color: #000;  word-wrap: break-word; display:block;">\n              <b>Fill below form to get in touch with us</b>\n            </span>\n          </ion-title>\n        </ion-card-header> -->\n        <p style="text-align: center; padding-top:20px; font-size:17px;"> <b>Fill below form to get in touch with us</b></p>\n        <ion-card-content>\n            <ion-col>\n          <form [formGroup]=\'contactusform\'>\n              <ion-list>\n                <ion-item>\n                  <ion-label floating>Enter First Name</ion-label>\n                  <ion-input  type="text"  formControlName="txtfirstName" name="txtfirstName"></ion-input>\n                </ion-item>\n                <div class="errormsg_style" *ngIf="!contactusform.controls[\'txtfirstName\'].valid && contactusform.controls[\'txtfirstName\'].touched">please enter First name</div>\n                <ion-item>\n                  <ion-label floating>Enter Last Name</ion-label>\n                  <ion-input   type="text" formControlName="txtLastName" name="txtLastName"></ion-input>\n                </ion-item>\n                <div class="errormsg_style" *ngIf="!contactusform.controls[\'txtLastName\'].valid && contactusform.controls[\'txtLastName\'].touched">please enter Last Name</div>\n                <ion-item>\n                  <ion-label floating>Your Email</ion-label>\n                  <ion-input  type="text" formControlName="txtEmail" name="txtEmail"></ion-input>\n                </ion-item>\n                <div class="errormsg_style" *ngIf="!contactusform.controls[\'txtEmail\'].valid && contactusform.controls[\'txtEmail\'].touched">please enter Valid email</div>\n                <ion-item>\n                  <ion-label floating>Phone No.</ion-label>\n                  <ion-input  type="text" formControlName="txtPhone" name="txtPhone"></ion-input>\n                </ion-item>\n                <div class="errormsg_style" *ngIf="!contactusform.controls[\'txtPhone\'].valid && contactusform.controls[\'txtPhone\'].touched">please enter Valid phone no</div>\n                <ion-item>\n                  <ion-label floating>Message</ion-label>\n                  <ion-input  type="text" formControlName="txtMessage" name="txtMessage"></ion-input>\n                </ion-item>\n                <div class="errormsg_style" *ngIf="!contactusform.controls[\'txtMessage\'].valid && contactusform.controls[\'txtMessage\'].touched">please enter your message</div>\n                <div padding>\n                    <button block ion-button (click)="ContactUs(contactusform.value)" [disabled]="!this.contactusform.valid">Submit</button>\n                  </div>\n              </ion-list>\n    \n             </form>\n      </ion-col>\n        </ion-card-content>\n      </ion-card>\n     \n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\contactus\contactus.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */]])
    ], ContactusComponent);
    return ContactusComponent;
}());

//# sourceMappingURL=contactus.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the SupportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SupportComponent = (function () {
    function SupportComponent() {
        console.log('Hello SupportComponent Component');
        this.text = 'Hello World';
    }
    SupportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'support',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\support\support.html"*/'<!-- Generated template for the SupportComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\staticPages\support\support.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SupportComponent);
    return SupportComponent;
}());

//# sourceMappingURL=support.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoinStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CoinStatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CoinStatusComponent = (function () {
    function CoinStatusComponent(general, auth, cryptoService, appUtils) {
        this.general = general;
        this.auth = auth;
        this.cryptoService = cryptoService;
        this.appUtils = appUtils;
        this.liveData = [];
        this.imgLinkPath = 'assets/imgs/cryptoicons/';
    }
    CoinStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.auth.spinner();
        // 
        this.general.getCountryData().then(function () {
            //this.countryData = this.general.countryData;
            _this.general.SelectedCountry = _this.general.countryData[7]; ///Defalut 7th index will be selected for USD, 0th index for INR
            _this.cryptoService.CurrencyLivePrice().then(function (res) {
                var countryCurrencies = '';
                for (var i = 0; i < _this.general.countryData.length; i++) {
                    // alert(JSON.stringify(this.general.countryData[i]));
                    countryCurrencies += _this.general.countryData[i].country_fiat + ',';
                }
                _this.general.LiveCurrencyValue(countryCurrencies).then(function (liveRes) {
                    console.log(typeof liveRes + ", " + JSON.stringify(liveRes, null, 4));
                    //let reqCurr = Object.keys(liveRes);
                    var currPrice = 1;
                    for (var currRate in liveRes) {
                        if (currRate.replace('USD', '') === _this.general.SelectedCountry.country_fiat) {
                            currPrice = liveRes[currRate];
                            break;
                        }
                    }
                    res.forEach(function (element) {
                        element.con_buy_price = (element.buy_price * currPrice).toFixed(2);
                        element.con_sell_price = (element.sell_price * currPrice).toFixed(2);
                    });
                    _this.liveData = res;
                    console.log("CurrencyLiveData:" + JSON.stringify(_this.liveData, null, 4));
                }, function (error) {
                    _this.liveData = res.forEach(function (element) {
                        element.con_buy_price = element.buy_price.toFixed(2);
                        element.con_sell_price = element.sell_price.toFixed(2);
                    });
                    _this.liveData = res;
                });
            }, function (err) {
                _this.appUtils.ShowToast(err, 'bottom', 6000);
            });
        }, function (error) {
            _this.appUtils.ShowToast(error, "bottom", 6000);
        });
    };
    CoinStatusComponent.prototype.ngOnDestroy = function () {
        //clearInterval(this.coninStatusInterval);
    };
    CoinStatusComponent.prototype.convertObjToArray = function (val) {
        var keys = [];
        for (var key in val) {
            var obj = val[key];
            for (var data in obj) {
                var pa = Object.keys(obj);
                keys.push({ key: key, value: obj[Object.keys(obj)[0]] });
            }
        }
        this.liveData = keys;
    };
    CoinStatusComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'coin-status',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\coin-status\coin-status.html"*/'<ion-navbar class="coinStatus">\n    <!-- <ion-title class="coinstatusTitle"> -->\n\n    <div class="marquee">\n        <div class="marquee--inner">\n            <span>\n                <ng-container *ngFor=\'let data of liveData\'>\n                    <span class="inline-list">\n                        <span style="line-height: 20px;padding-top: 3px;">\n                            <img src="http://ilhaus.com/dev/valuebit/storage/uploads/user_null/{{data.curr_img}}" />\n                        </span>\n                    </span>\n                    <span class="inline-list" style="padding-left: 10px; padding-right: 10px;">\n                        <span style="line-height: 10px;">\n                            <p>\n                                {{data.curr_code}}/{{general.SelectedCountry.country_fiat || \'USD\'}}\n                            </p>\n                            <p>\n                                Buy:{{data.con_buy_price}} | Sell:{{data.con_sell_price}}\n                            </p>\n                        </span>\n                    </span>\n                </ng-container>\n                <ng-container *ngFor=\'let data of liveData\'>\n                    <span class="inline-list">\n                        <span style="line-height: 20px;padding-top: 3px;">\n                            <img src="http://ilhaus.com/dev/valuebit/storage/uploads/user_null/{{data.curr_img}}" />\n                        </span>\n                    </span>\n                    <span class="inline-list" style="padding-left: 10px; padding-right: 10px;">\n                        <span style="line-height: 10px;">\n                            <p>\n                                {{data.curr_code}}/{{general.SelectedCountry.country_fiat || \'USD\'}}\n                            </p>\n                            <p>\n                                Buy:{{data.con_buy_price}} | Sell:{{data.con_sell_price}}\n                            </p>\n                        </span>\n                    </span>\n                </ng-container>\n            </span>\n            <!-- <span>\n                    <div class="orb"></div>\n                    <div class="orb red"></div>\n                    <div class="orb yellow"></div>\n                    <div class="orb blue"></div>\n                    <div class="orb orange"></div>\n                    <div class="orb purple"></div>\n                    <div class="orb green"></div>\n                    <div class="orb"></div>\n                </span> -->\n\n        </div>\n    </div>\n    <!-- </ion-title> -->\n</ion-navbar>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\coin-status\coin-status.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_apputils_apputils__["a" /* AppUtils */]])
    ], CoinStatusComponent);
    return CoinStatusComponent;
}());

//# sourceMappingURL=coin-status.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crypto_currency_buy_crypto_currency_buy__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__crypto_currency_sell_crypto_currency_sell__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__crypto_currency_send_crypto_currency_send__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__crypto_currency_history_crypto_currency_history__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__crypto_currency_exchange_crypto_currency_exchange__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__copycurrencyaddressmodal_copycurrencyaddressmodal__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CryptoCurrencyDashboardComponent = (function () {
    function CryptoCurrencyDashboardComponent(nav, modalCtrl, cryptoService, pnkServiceDash, appUtilsDash) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.cryptoService = cryptoService;
        this.pnkServiceDash = pnkServiceDash;
        this.appUtilsDash = appUtilsDash;
    }
    CryptoCurrencyDashboardComponent.prototype.ngOnInit = function () {
        // alert("Crypto page");
        // this.cryptoService.GetCryptoCurrencies().then((res)=>{
        this.cryptoCurrencies = this.cryptoService.CryptoCurrencies;
        //console.log(this.cryptoCurrencies);
        //   },
        // (error)=>{
        //   alert("GetCryptoError::"+error);
        // })
    };
    CryptoCurrencyDashboardComponent.prototype.Goto = function (val, currency) {
        if (val == 'buy') {
            // alert("ParamSting::"+JSON.stringify(currency,null,4));
            //this.nav.push(FiatNavigationPage,{data:'deposit'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__crypto_currency_buy_crypto_currency_buy__["a" /* CryptoCurrencyBuyComponent */], { currency: currency });
            profileModal.present();
        }
        else if (val == 'exchange') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__crypto_currency_exchange_crypto_currency_exchange__["a" /* CryptoCurrencyExchangeComponent */], { currency: currency });
            profileModal.present();
        }
        else if (val == 'sell') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__crypto_currency_sell_crypto_currency_sell__["a" /* CryptoCurrencySellComponent */], { currency: currency });
            profileModal.present();
        }
        else if (val == 'send') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__crypto_currency_send_crypto_currency_send__["a" /* CryptoCurrencySendComponent */], { currency: currency });
            profileModal.present();
        }
        else if (val == 'history') {
            //this.nav.push(FiatNavigationPage,{data:'withdraw'});
            var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__crypto_currency_history_crypto_currency_history__["a" /* CryptoCurrencyHistoryComponent */], { currency: currency });
            profileModal.present();
        }
        else if (val == 'receive') {
            this.ShowAddress(currency);
        }
        //this.fiatPage.fiatWithdraw = true;
    };
    CryptoCurrencyDashboardComponent.prototype.ShowAddress = function (currency) {
        var CurrencyAddressModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__copycurrencyaddressmodal_copycurrencyaddressmodal__["a" /* CopycurrencyaddressmodalComponent */], {
            modalData: currency
        });
        CurrencyAddressModal.present();
    };
    CryptoCurrencyDashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'crypto-currency-dashboard',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-dashboard\crypto-currency-dashboard.html"*/'<div *ngIf="cryptoCurrencies != undefined && cryptoCurrencies.length >0">\n  <ion-card class="cardBackground" *ngFor="let data of cryptoCurrencies">\n    <ion-card-content>\n      <ion-row>\n        <ion-col col-2 class="icon-container btc">\n          <img class="" [src]="appUtilsDash.SanitizeUrl(this.pnkServiceDash.AssetsUrl+\'storage/uploads/user_null/\'+data.curr_image)">\n        </ion-col>\n        <ion-col col-10 text-center>\n          <!-- <ion-row>\n            <ion-col>\n              <div style="text-align:right">{{data.total_balance}}</div>\n            </ion-col>\n          </ion-row> -->\n\n          <ion-row>\n            <ion-col>\n              <div style="text-align: center">{{data.curr_code}}</div>\n            </ion-col>\n            <ion-col>\n              <div style="text-align: left">{{data.available_balance}}</div>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12 align-items-center>\n              <button class="sendBtn" ion-button small outline text-center (click)="Goto(\'send\', data)">Send</button>\n              <button class="buyBtn" ion-button small outline text-center (click)="Goto(\'exchange\', data)">Exchange</button>\n              <!-- <button class="sellBtn" ion-button small outline text-center (click)="Goto(\'sell\', data)">Sell</button> -->\n              <button class="sellBtn" ion-button small outline text-center (click)="Goto(\'receive\', data)">Receive</button>\n              <button class="historyBtn" ion-button small outline text-center (click)="Goto(\'history\', data)">History</button>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n</div>\n<div *ngIf="cryptoCurrencies == undefined || cryptoCurrencies.length ==0" class="nodata"> No data availble.\n</div>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\cryptoCurrency\crypto-currency-dashboard\crypto-currency-dashboard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_9__providers_apputils_apputils__["a" /* AppUtils */]])
    ], CryptoCurrencyDashboardComponent);
    return CryptoCurrencyDashboardComponent;
}());

//# sourceMappingURL=crypto-currency-dashboard.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = (function () {
    function SignupComponent(formBuilder, homePage, auth) {
        this.formBuilder = formBuilder;
        this.homePage = homePage;
        this.auth = auth;
        this.passwordType = 'password';
        this.usernameavailable = false;
        this.emailavailable = false;
        this.signupForm = this.formBuilder.group({
            txtSignUpUserEmail: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
                ])],
            pwdSignUpUserPassword: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6),
                ])],
            txtSignUpUserName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)])],
        });
    }
    SignupComponent.prototype.checkUsernameAvailability = function (username) {
        var _this = this;
        console.log(username.value);
        if (username.value.length > 5) {
            this.auth.checkUserName(username.value).then(function () {
                _this.usernameavailable = true;
            }, function (error) {
                _this.usernameavailable = false;
                _this.msg = error;
                // this.signupForm.controls['txtSignUpUserName'].valid = false;
            });
        }
        else {
            this.usernameavailable = false;
        }
    };
    SignupComponent.prototype.checkEmailAvailability = function (email) {
        var _this = this;
        if (this.signupForm.controls['txtSignUpUserEmail'].valid) {
            this.auth.checkEmail(email.value).then(function () {
                _this.emailavailable = true;
            }, function (error) {
                _this.emailavailable = false;
                _this.msg = error;
                // this.signupForm.controls['txtSignUpUserEmail'].valid = false;
            });
        }
        else {
            this.emailavailable = false;
        }
    };
    SignupComponent.prototype.cancelSignup = function () {
        this.homePage.login = true;
        this.homePage.signup = false;
    };
    SignupComponent.prototype.signupEmailFormSubmit = function () {
        var _this = this;
        if ((this.signupForm.value.txtSignUpUserEmail != '') && (this.signupForm.value.pwdSignUpUserPassword != '')) {
            this.auth.spinner();
            this.auth.Register(this.signupForm.value).then(function () {
                _this.auth.spinnerEnable.dismiss();
                _this.auth.toastDesignClass = 'success';
                _this.signupForm.reset();
                _this.auth.toastMsg = _this.auth.temp;
                _this.auth.toast();
                setTimeout(function () {
                    _this.cancelSignup();
                }, _this.auth.toastTimeOut);
            }, function (error) {
                _this.auth.spinnerEnable.dismiss();
                _this.signupForm.reset();
                _this.auth.toastDesignClass = 'error';
                _this.auth.toastMsg = error;
                _this.auth.toast();
            });
        }
        else {
            this.auth.toastDesignClass = 'error';
            this.auth.toastMsg = 'All the fields are necessary';
            this.auth.toast();
        }
    };
    SignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'signup',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\signup\signup.html"*/'<div class="outterMostDiv">\n  <ion-grid>\n    <ion-row>\n      <ion-col class="ionicLogoOuter">\n        <div class="logoOuter">\n          <img src="assets/imgs/logo2.png" class="logo" />\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class="logoHeader">\n        Valuebit\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-list class="signup-list">\n          <form [formGroup]="signupForm" (ngSubmit)="signupEmailFormSubmit()">\n            \n            <ion-item class="formInput">\n              <ion-label color="primary">\n                <ion-icon class="IonIcon" name="ios-person-outline"></ion-icon>\n              </ion-label>\n              <ion-input type="text" placeholder="User Name" formControlName="txtSignUpUserName" (keyup)="checkUsernameAvailability(signupForm.controls[\'txtSignUpUserName\'])"></ion-input>\n            </ion-item>\n            <div class="alert" *ngIf="signupForm.controls[\'txtSignUpUserName\'].touched && !usernameavailable">Username Not Available</div>\n            <div class="alert" *ngIf="!signupForm.controls[\'txtSignUpUserName\'].valid && signupForm.controls[\'txtSignUpUserName\'].touched && usernameavailable">Min 6 characters required</div>\n  \n            <ion-item class="formInput">\n              <ion-label color="primary">\n                <ion-icon class="IonIcon" name="ios-mail-outline"></ion-icon>\n              </ion-label>\n              <ion-input type="email" placeholder="Email" formControlName="txtSignUpUserEmail" (keyup)="checkEmailAvailability(signupForm.controls[\'txtSignUpUserEmail\'])"></ion-input>\n            </ion-item>\n            <div class="alert" *ngIf="signupForm.controls[\'txtSignUpUserEmail\'].touched && !emailavailable">Email not available</div>\n            <div class="alert" *ngIf="!signupForm.controls[\'txtSignUpUserEmail\'].valid && signupForm.controls[\'txtSignUpUserEmail\'].touched && emailavailable">Invalid Email Address</div>\n            <!-- <div class="alert" *ngIf="!signupForm.controls[\'txtSignUpUserName\'].valid && signupForm.controls[\'txtSignUpUserName\'].touched">{{msg}}</div> -->\n            <ion-item class="formInput">\n              <ion-label color="primary">\n                <ion-icon class="IonIcon" name="ios-unlock-outline"></ion-icon>\n              </ion-label>\n              <ion-input type={{passwordType}} placeholder="Password" formControlName="pwdSignUpUserPassword"></ion-input>\n            </ion-item>\n            <div class="alert" *ngIf="!signupForm.controls[\'pwdSignUpUserPassword\'].valid && signupForm.controls[\'pwdSignUpUserPassword\'].touched">Min 6 characters required</div>\n            <ion-grid class="loginBtnGrid">\n              <ion-row>\n                <ion-col class="signupBtnGrid">\n                  <button ion-button round outline full [disabled]="!signupForm.valid || !usernameavailable || !emailavailable" class="signupBtn">Register</button>\n                  <!--button ion-button round outline type="button" (click)="cancelSignup()">Cancel</button-->\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n            <ion-grid>\n              <ion-row>\n                <ion-col>\n                  <span class="signupLoginBtn">\n                    <span (click)="cancelSignup()">Already have an account? <b> Log In</b></span>\n                  </span>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </form>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]])
    ], SignupComponent);
    return SignupComponent;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerifyPinComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the VerifyPinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var VerifyPinComponent = (function () {
    /*
    userPin: number;
    private verifyPin: FormGroup;
    private reverifyPin: FormGroup;
    formStatus = false;*/
    function VerifyPinComponent(pnkHttpService, home, navCtrl, formBuilder, auth) {
        this.pnkHttpService = pnkHttpService;
        this.home = home;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.inpComp = false;
        /*@ViewChild('pin1') pin1;
        @ViewChild('pin2') pin2;
        @ViewChild('pin3') pin3;
        @ViewChild('pin4') pin4;
        @ViewChild('pin11') pin11;
        @ViewChild('pin22') pin22;
        @ViewChild('pin33') pin33;
        @ViewChild('pin44') pin44;*/
        this.actualPin = '';
        this.reverify = false;
        this.txtAppPin = {};
        /*
        this.verifyPin = this.formBuilder.group({
            pin1: ['', ''],
            pin2: ['', ''],
            pin3: ['', ''],
            pin4: ['', ''],
        });

        this.reverifyPin = this.formBuilder.group({
            pin11: ['', ''],
            pin22: ['', ''],
            pin33: ['', ''],
            pin44: ['', ''],
        });

        */
    }
    VerifyPinComponent.prototype.ngOnInit = function () {
        this.setFocus();
        if (localStorage.getItem('userData') != null) {
            // this.auth.userData = JSON.parse(localStorage.getItem('userData'));
            //this.pnkHttpService.token = JSON.parse(localStorage.getItem('token'));
            if (this.auth.userData != null) {
                this.auth.loggedIn = true;
                this.home.pinVerification = true;
                if (this.auth.userData.userfourdigitpinstatus == 1) {
                    this.auth.userPinSetStatus = true;
                }
                else {
                    this.auth.userPinSetStatus = false;
                }
            }
            else {
            }
        }
    };
    VerifyPinComponent.prototype.ionViewDidLoad = function () {
        /*if (!this.auth.userPinSetStatus) {
            this.verifyPin.value.pin1 = this.verifyPin.value.pin2 = this.verifyPin.value.pin3 = this.verifyPin.value.pin4 =
                this.reverifyPin.value.pin11 = this.reverifyPin.value.pin22 = this.reverifyPin.value.pin33 = this.reverifyPin.value.pin44 = '';
        } else {
            this.reverifyPin.value.pin11 = this.reverifyPin.value.pin22 = this.reverifyPin.value.pin33 = this.reverifyPin.value.pin44 = '';
        }*/
    };
    VerifyPinComponent.prototype.getValue = function ($event) {
        var _this = this;
        if ($event.target.value.length == 4) {
            //when all the entries are done
            this.inpComp = true;
            this.txtAppPin.txtAppPin = $event.target.value;
            if (this.auth.userData.userfourdigitpinstatus == 0) {
                // if setting pin for the first time
                if (!this.reverify) {
                    this.inpComp = false;
                    //re entering the same pin
                    this.reverify = true;
                    this.actualPin = $event.target.value;
                    $event.target.value = '';
                }
                else {
                    this.inpComp = true;
                    // pin has been entered twice
                    if (this.actualPin == this.txtAppPin.txtAppPin) {
                        this.auth.spinner();
                        // both the pins match offlie before sending the server
                        this.auth.pinSet(this.txtAppPin).then(function () {
                            _this.auth.spinnerEnable.dismiss();
                            _this.auth.toastDesignClass = 'success';
                            _this.auth.toastMsg = 'Pin has been set';
                            _this.auth.toast();
                            setTimeout(function () {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__["a" /* DashboardPage */]);
                            }, _this.auth.toastTimeOut);
                        }, function (error) {
                            $event.target.value = '';
                            _this.inpComp = false;
                            _this.auth.spinnerEnable.dismiss();
                            _this.auth.toastDesignClass = 'error';
                            _this.auth.toastMsg = 'Unable To set pin. Please Try again';
                            _this.auth.toast();
                            _this.setFocus();
                        });
                    }
                    else {
                        // both the pins didnot match offlie before sending the server
                        this.inpComp = true;
                        this.auth.toastDesignClass = 'error';
                        this.auth.toastMsg = 'Entered pin did not match!';
                        this.auth.toast();
                        this.setFocus();
                    }
                }
            }
            else {
                // pin was previously set now verifying from the server
                if (this.txtAppPin != '') {
                    this.auth.spinner();
                    this.auth.pinVerification(this.txtAppPin).then(function () {
                        _this.auth.spinnerEnable.dismiss();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__["a" /* DashboardPage */]);
                    }, function (error) {
                        _this.inpComp = false;
                        $event.target.value = '';
                        _this.auth.spinnerEnable.dismiss();
                        _this.auth.toastDesignClass = 'error';
                        _this.auth.toastMsg = error;
                        _this.auth.toast();
                        _this.setFocus();
                    });
                }
                else {
                    // entering null for pin verification
                    $event.target.value = '';
                    this.inpComp = false;
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Input value cannot be empty!';
                    this.auth.toast();
                    this.setFocus();
                }
            }
        }
        console.log($event.target.value);
    };
    VerifyPinComponent.prototype.setFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.pin.nativeElement.focus();
        }, 500);
    };
    /*pinVerification() {
        this.auth.spinner();
        if (!this.auth.userPinSetStatus) {
            this.userPin = this.verifyPin.value.pin1 + this.verifyPin.value.pin2 + this.verifyPin.value.pin3 + this.verifyPin.value.pin4;
            let temp = this.reverifyPin.value.pin11 + this.reverifyPin.value.pin22 + this.reverifyPin.value.pin33 + this.reverifyPin.value.pin44;
            if ((this.userPin == temp) && (this.formStatus)) {
                this.txtAppPin.txtAppPin = this.userPin;
                this.auth.pinSet(this.txtAppPin).then(() => {
                    this.auth.spinnerEnable.dismiss();
                    this.auth.toastDesignClass = 'success';
                    this.auth.toastMsg = 'Pin has been set';
                    this.auth.toast();
                    setTimeout(() => {
                        this.navCtrl.setRoot(DashboardPage);
                    }, this.auth.toastTimeOut);
                }, (error) => {
                    this.auth.spinnerEnable.dismiss();
                    this.verifyPin.reset();
                    this.reverifyPin.reset();
                    this.pin1.setFocus();
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Unable To set pin. Please Try again';
                    this.auth.toast();
                });
            } else {
                this.auth.spinnerEnable.dismiss();
                this.reverifyPin.reset();
                this.pin1.setFocus();
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = 'Pin did not match!';
                this.auth.toast();
            }
        }
        else {
            let temp = this.reverifyPin.value.pin11 + this.reverifyPin.value.pin22 + this.reverifyPin.value.pin33 + this.reverifyPin.value.pin44;
            this.txtAppPin.txtAppPin = temp;
            if (this.formStatus) {
                this.auth.pinVerification(this.txtAppPin).then(() => {
                    this.auth.spinnerEnable.dismiss();
                    this.navCtrl.setRoot(DashboardPage);
                }, (error) => {
                    this.auth.spinnerEnable.dismiss();
                    this.verifyPin.reset();
                    this.reverifyPin.reset();
                    setTimeout(() => {
                        this.pin11.setFocus();
                    }, 1000);
                    this.auth.toastDesignClass = 'error';
                    this.auth.toastMsg = 'Unable to connnect to Internet!';
                    this.auth.toast();
                });
            } else {
                this.auth.toastDesignClass = 'error';
                this.auth.toastMsg = 'Please Re-Enter pin!';
                this.auth.toast();
            }
        }
    }*/
    /*checkPinFormStatus() {
        if (!this.auth.userPinSetStatus) {
            if ((this.verifyPin.value.pin1 != '') && (this.verifyPin.value.pin2 != '') && (this.verifyPin.value.pin3 != '') && (this.verifyPin.value.pin4 != '')) {
                if ((this.verifyPin.value.pin11 != '') && (this.verifyPin.value.pin22 != '') && (this.verifyPin.value.pin33 != '') && (this.verifyPin.value.pin44 != '')) {
                    this.formStatus = true;
                    setTimeout(() => {
                        this.pinVerification();
                    }, 100);
                }
            } else {
                this.auth.toastDesignClass = 'error';
                this.auth.disableForm = false;
                this.verifyPin.reset();
                this.reverifyPin.reset();
            }
        } else {
            if ((this.verifyPin.value.pin11 != '') && (this.verifyPin.value.pin22 != '') && (this.verifyPin.value.pin33 != '') && (this.verifyPin.value.pin44 != '')) {
                this.formStatus = true;
                setTimeout(() => {
                    this.pinVerification();
                }, 100);
            }
            else {
                this.verifyPin.reset();
                this.reverifyPin.reset();
            }
        }
    }*/
    VerifyPinComponent.prototype.changeFocus = function (val, ev) {
        /*if(ev.key == 'Backspace'){
            this.reverifyPin.reset();
            setTimeout(()=>{
                this.pin11.setFocus();
            },350);
        }else{
            if ((val == 'pin1') && (this.reverifyPin.value.pin1 != '')) {
                this.pin2.setFocus();
            } else if (val == 'pin2') {
                this.pin3.setFocus();
            } else if (val == 'pin3') {
                this.pin4.setFocus();
            } else if (val == 'pin4') {
                this.reverify = true;
                setTimeout(() => {
                    this.pin11.setFocus();
                }, 1000)
            }
        }*/
    };
    VerifyPinComponent.prototype.rechangeFocus = function (val, ev) {
        /*if(ev.key == 'Backspace'){
            this.reverifyPin.reset();
            setTimeout(()=>{
                this.pin11.setFocus();
            },350);
        }else{
            if (val == 'pin11') {
                if(this.reverifyPin.value.pin11 == ''){
                    this.pin11.setFocus();
                }else{
                    this.pin22.setFocus();
                }

            } else if (val == 'pin22') {
                if(this.reverifyPin.value.pin22 == ''){
                    this.pin22.setFocus();
                }else{
                    this.pin33.setFocus();
                }
            } else if (val == 'pin33') {
                if(this.reverifyPin.value.pin33 == ''){
                    this.pin33.setFocus();
                }else{
                    this.pin44.setFocus();
                }
            } else if (val == 'pin44') {
                if(this.reverifyPin.value.pin44 == ''){
                    this.pin44.setFocus();
                }else{
                    this.auth.disableForm = true;
                    if (this.auth.userPinSetStatus) {
                        this.checkPinFormStatus();
                    } else {
                        this.checkPinFormStatus();
                    }
                }
            }
        }*/
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pin'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], VerifyPinComponent.prototype, "pin", void 0);
    VerifyPinComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'verify-pin',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\verify-pin\verify-pin.html"*/'<div>\n    <ion-list>\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <!-- <ion-title *ngIf="!auth.userPinSetStatus && !reverify" class="navbarAppHead">Enter a new Pin</ion-title>\n                    <ion-title *ngIf="auth.userPinSetStatus" class="navbarAppHead">Pin Verification</ion-title>\n                    <ion-title *ngIf="reverify" class="navbarAppHead">Enter the pin again</ion-title> -->\n                    <!-- <ion-title class="navbarAppHead">Enter your verification code</ion-title> -->\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <input type="number" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" [disabled]="inpComp" class="pin twoPin" maxlength="4"\n                        placeholder="xxxx" #pin id="pin" autofocus/>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <!--<form [formGroup]="verifyPin" (ngSubmit)="pinVerification()">\n          <ion-item class="formInput">\n            <ion-input type="text" [disabled]="auth.disableForm" maxLength="1" (keyup)="changeFocus(\'pin1\',$event)" #pin1 formControlName="pin1"></ion-input>\n            <ion-input type="text" [disabled]="auth.disableForm" maxLength="1" (keyup)="changeFocus(\'pin2\',$event)" #pin2 formControlName="pin2"></ion-input>\n            <ion-input type="text" [disabled]="auth.disableForm" maxLength="1" (keyup)="changeFocus(\'pin3\',$event)" #pin3 formControlName="pin3"></ion-input>\n            <ion-input type="text" [disabled]="auth.disableForm" maxLength="1" (keyup)="changeFocus(\'pin4\',$event)" #pin4 formControlName="pin4"></ion-input>\n          </ion-item>\n        </form>-->\n    </ion-list>\n    <!--ion-list *ngIf="reverify">\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <ion-title>Re-Enter a Pin</ion-title>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <input type="text" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" [disabled]="inpComp"\n               maxlength="4" placeholder="xxxx"/>\n        <!--<form [formGroup]="reverifyPin" (ngSubmit)="pinVerification()">\n          <ion-item class="formInput">\n            <ion-input type="text"  maxLength="1" (keyup)="rechangeFocus(\'pin11\',$event)" #pin11 formControlName="pin11"></ion-input>\n            <ion-input type="text"  maxLength="1" (keyup)="rechangeFocus(\'pin22\',$event)" #pin22 formControlName="pin22"></ion-input>\n            <ion-input type="text"  maxLength="1" (keyup)="rechangeFocus(\'pin33\',$event)" #pin33 formControlName="pin33"></ion-input>\n            <ion-input type="text"  maxLength="1" (keyup)="rechangeFocus(\'pin44\',$event)" #pin44 formControlName="pin44"></ion-input>\n          </ion-item>\n        </form>>\n    </ion-list>\n</div>\n<div *ngIf="auth.userPinSetStatus">\n    <ion-list>\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <ion-title>Verify your Pin</ion-title>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <input type="text" (keyup)="getValue($event)" pattern="^[1-9][0-9]*$" [disabled]="inpComp" id="inputPin"\n               maxlength="4" placeholder="xxxx"/>\n        <!--<form [formGroup]="rePinInput">\n          <ion-item class="formInput">\n            <ion-input type="text" maxLength="1"  (keyup)="rechangeFocus(\'pin11\',$event)" #pin11 formControlName="pin11"></ion-input>\n            <ion-input type="text" maxLength="1"  (keyup)="rechangeFocus(\'pin22\',$event)" #pin22 formControlName="pin22"></ion-input>\n            <ion-input type="text" maxLength="1"  (keyup)="rechangeFocus(\'pin33\',$event)" #pin33 formControlName="pin33"></ion-input>\n            <ion-input type="text" maxLength="1"  (keyup)="rechangeFocus(\'pin44\',$event)" #pin44 formControlName="pin44"></ion-input>\n          </ion-item>\n        </form>>\n    </ion-list -->\n    <ion-list>\n        <div class="verifyPinTxt">\n            <div style="text-align: center">Note</div>\n            <div style="text-align: left">\n                <p>1. Please preserve this pin and keep it safe.</p>\n                <p>2. Please do not share this pin with anyone else.</p>\n                <p>3. This pin will be used for unlocking the app.</p>\n            </div>\n        </div>\n    </ion-list>\n</div>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\verify-pin\verify-pin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]])
    ], VerifyPinComponent);
    return VerifyPinComponent;
}());

//# sourceMappingURL=verify-pin.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwoSfComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_view_controller__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TwoSfComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var TwoSfComponent = (function () {
    function TwoSfComponent(events, navCtrl, viewCtrl, formBuilder, auth, platform, appUtils) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.platform = platform;
        this.appUtils = appUtils;
        this.ChangeTwoFaStatus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.inpComp = false;
        this.twoSFForm = this.formBuilder.group({
            txtTwoFactorAuthenticatorCode: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)])]
        });
    }
    TwoSfComponent.prototype.ngOnInit = function () {
        //console.log(this.sendTo);
    };
    TwoSfComponent.prototype.twoSF = function () {
        var _this = this;
        //alert("Before:"+this.twoSFForm.value.txtTwoFactorAuthenticatorCode)
        if (this.twoSFForm.value.txtTwoFactorAuthenticatorCode != '' && this.twoSFForm.value.txtTwoFactorAuthenticatorCode != null) {
            this.appUtils.ShowLoader();
            this.auth.twoSFPasswordVerify(this.twoSFForm.value).then(function (res) {
                _this.appUtils.HideLoader();
                _this.events.publish('twoSF:verified', _this.twoSFForm.value, _this.sendTo);
                _this.auth.twoSFPassVerificationStatus = true;
                _this.auth.twoFactorStatus = 0;
                if (_this.sendTo != 'CryptoCurrencyBuyComponent' && _this.sendTo != 'CryptoCurrencySendComponent' && _this.sendTo != 'TwoStepVerificationComponent') {
                    // alert("InTwoFA");                
                    _this.appUtils.ShowToast(res, "bottom", 6000);
                    _this.twoSFForm.reset();
                }
                if (_this.sendTo == 'TwoStepVerificationComponent') {
                    //alert(this.twoSFForm.value.txtTwoFactorAuthenticatorCode);
                    var data = { status: true, data: { txtTwoFactorAuthenticatorCode: _this.twoSFForm.value.txtTwoFactorAuthenticatorCode } };
                    _this.ChangeTwoFaStatus.emit(data);
                    //this.twoSFForm.reset();
                    // this.navCtrl.pop();
                }
            }, function (error) {
                _this.appUtils.HideLoader();
                _this.auth.twoSFPassVerificationStatus = false;
                _this.appUtils.ShowToast(error, "bottom", 6000);
                _this.twoSFForm.reset();
            });
        }
        else {
            this.appUtils.ShowToast("Please enter your Verification Password", "bottom", 6000);
        }
    };
    TwoSfComponent.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    TwoSfComponent.prototype.exitApp = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('sendTo'),
        __metadata("design:type", Object)
    ], TwoSfComponent.prototype, "sendTo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], TwoSfComponent.prototype, "ChangeTwoFaStatus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('twopin'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TwoSfComponent.prototype, "twopin", void 0);
    TwoSfComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'two-sf',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\two-sf\two-sf.html"*/'<ion-list>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <form [formGroup]="twoSFForm" (ngSubmit)="twoSF()">\n                    <ion-row>\n                        <ion-col>\n                            <ion-row>\n                                <input type="number" pattern="^[1-9][0-9]*$" formControlName="txtTwoFactorAuthenticatorCode" [disabled]="inpComp" class="pintwosf twoPin"\n                                    maxlength="4" placeholder="xxxxxx" #twopin id="twopin" autofocus/>\n                            </ion-row>\n                            <ion-row>\n                                <ion-col class="loginBtnGrid">\n                                    <button style="float:right" ion-button round outline full class="twosfBtn" [disabled]="!this.twoSFForm.valid">VERIFY &nbsp;\n                                        <ion-icon name="md-checkmark"></ion-icon>\n                                    </button>\n                                    <!--button ion-button round outline type="button" (click)="signup()">Sign up</button -->\n                                </ion-col>\n                                <ion-col class="loginBtnGrid">\n                                    <button style="float:left" ion-button round outline full class="twosfBtn cancelBtn" (click)="dismiss()">CANCEL &nbsp;\n                                        <ion-icon name="md-close"></ion-icon>\n                                    </button>\n                                    <!--button ion-button round outline type="button" (click)="signup()">Sign up</button -->\n                                </ion-col>\n                            </ion-row>\n                        </ion-col>\n                    </ion-row>\n                    <!-- <input  autofocus/> -->\n                    <!--<ion-item class="formInput">\n                        <ion-label color="primary" floating>\n                            <ion-icon name="md-key"></ion-icon>\n                            Password\n                        </ion-label>\n                        <ion-input type={{passwordType}}\n                                   formControlName="txtTwoFactorAuthenticatorCode"></ion-input>\n                    </ion-item>-->\n                    <!-- <ion-grid>\n                        <ion-row>\n                            <ion-col>\n                                <button class="twosfBtn" ion-button round outline [disabled]="!twoSFForm.valid">Verify</button>\n                                <button class="twosfBtn" ion-button round outline type="button" (click)="exitApp()">Cancel</button>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid> -->\n                </form>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-list>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\two-sf\two-sf.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_view_controller__["a" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_apputils_apputils__["a" /* AppUtils */]])
    ], TwoSfComponent);
    return TwoSfComponent;
}());

//# sourceMappingURL=two-sf.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BankDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var BankDetailsComponent = (function () {
    function BankDetailsComponent(events, formBuilder, viewCtrl, auth) {
        this.events = events;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.auth = auth;
        this.formActive = true;
        this.twoStepActive = false;
        this.fetchedBankDetails = [];
        this.bankDetailsForm = this.formBuilder.group({
            nameOnBankAccount: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            bankName: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            accountNumber: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            ifscCode: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            swiftCode: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            bankBranchName: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])],
            bankBranchAddress: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)])]
        });
        // events.subscribe('twoSF:verified', (twoSF, component) => {
        //     this.verifyTwoSf(twoSF, component);
        //     twoSF = null;
        //     component = null;
        // });
    }
    BankDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  this.componentName = BankDetailsComponent;
        this.auth.getBankDetails().then(function () {
            _this.fetchedBankDetails = _this.auth.bankDetails;
            // alert(JSON.stringify(this.fetchedBankDetails));
            //console.log("bank kamlesh pal" +this.fetchedBankDetails);
            _this.bankDetailsForm.patchValue({
                nameOnBankAccount: _this.auth.bankDetails[0].bank_acc_name,
                bankName: _this.auth.bankDetails[0].bank_name,
                accountNumber: _this.auth.bankDetails[0].bank_acc_no,
                ifscCode: _this.auth.bankDetails[0].bank_ifsc_code,
                swiftCode: _this.auth.bankDetails[0].bank_swift_code,
                bankBranchName: _this.auth.bankDetails[0].bank_branch,
                bankBranchAddress: _this.auth.bankDetails[0].bank_address,
            });
        }, function (error) {
            console.log(error);
        });
    };
    BankDetailsComponent.prototype.saveBankDetails = function (formdata) {
        var _this = this;
        //console.log(formdata);
        // alert(formdata);
        // this.bankdetails = 
        // if ((component == BankDetailsComponent) && (twoSF != undefined)) {
        this.auth.spinner();
        this.auth.postBankDetails(this.bankDetailsForm.value).then(function () {
            _this.auth.spinnerEnable.dismiss();
            _this.formActive = false;
            _this.auth.toastDesignClass = "success";
            _this.auth.toastMsg = "Bank Details saved successfully";
            _this.auth.toast();
        }, function (error) {
            _this.auth.spinnerEnable.dismiss();
            _this.auth.toastDesignClass = "error";
            _this.auth.toastMsg = "An error occured";
            _this.auth.toast();
        });
        // }
    };
    // checkTwoSf() {
    //     this.twoStepActive = true;
    // }
    BankDetailsComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BankDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'bank-details',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\bank-details\bank-details.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title class="navbarApp">BANK DETAILS</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text color="primary" showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <!-- <ion-title text-center>\n        Bank Details\n    </ion-title> -->\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <form [formGroup]="bankDetailsForm">\n                      <!-- {{this.fetchedBankDetails | json}} -->\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <ion-icon class="IonIcon" name="md-person"></ion-icon>\n                        </ion-label>\n                        <ion-input class="bankInput" placeholder="Name as per bank account" [disabled]=\'!formActive\' type="text" formControlName="nameOnBankAccount"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'nameOnBankAccount\'].valid && bankDetailsForm.controls[\'nameOnBankAccount\'].touched">please enter name as per bank account</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <i class="fa fa-university"></i>\n                        </ion-label>\n                        <ion-input class="bankInput" placeholder="Bank Name" type="text" [disabled]=\'!formActive\' formControlName="bankName"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'bankName\'].valid && bankDetailsForm.controls[\'bankName\'].touched">please enter Your bank name</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <i class="fa fa-comment"></i>\n                        </ion-label>\n                        <ion-input class="bankInput" type="number" placeholder="Account Number" [disabled]=\'!formActive\' formControlName="accountNumber"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'accountNumber\'].valid && bankDetailsForm.controls[\'accountNumber\'].touched">please enter valid account no</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <i class="fa fa-align-right"></i>\n                        </ion-label>\n                        <ion-input class="bankInput" type="text" placeholder="IFSC Code" [disabled]=\'!formActive\' formControlName="ifscCode"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'ifscCode\'].valid && bankDetailsForm.controls[\'ifscCode\'].touched">please enter valid ifsc code</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <i class="fa fa-edit"></i>\n                        </ion-label>\n                        <ion-input class="bankInput" type="text" placeholder="Swift Code" [disabled]=\'!formActive\' formControlName="swiftCode"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'swiftCode\'].valid && bankDetailsForm.controls[\'swiftCode\'].touched">please enter valid swift code</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <ion-icon name="logo-usd"></ion-icon>\n                        </ion-label>\n                        <ion-input class="bankInput" type="text" placeholder="Bank Branch" [disabled]=\'!formActive\' formControlName="bankBranchName"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'bankBranchName\'].valid && bankDetailsForm.controls[\'bankBranchName\'].touched">please enter valid bank brach name</div>\n                    <ion-item class="formInput">\n                        <ion-label>\n                            <i class="fa fa-address-book"></i>\n                        </ion-label>\n                        <ion-input class="bankInput" type="text" placeholder="Bank Address" [disabled]=\'!formActive\' formControlName="bankBranchAddress"></ion-input>\n                    </ion-item>\n                    <div class="errormsg_style" *ngIf="!bankDetailsForm.controls[\'bankBranchAddress\'].valid && bankDetailsForm.controls[\'bankBranchAddress\'].touched">please enter valid bank brach address</div>\n                    <div class="outerDiv">\n                        <button class="customBtn" ion-button type="submit" (click)="saveBankDetails(bankDetailsForm.value)" [disabled]="!bankDetailsForm.valid">\n                            Submit\n                        </button>\n                    </div>\n                </form>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <!-- <ion-grid *ngIf=\'twoStepActive\'>\n        <ion-row>\n            <ion-col>\n                <two-sf [sendTo]="componentName"></two-sf>\n            </ion-col>\n        </ion-row>\n    </ion-grid> -->\n</ion-content>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\bank-details\bank-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]])
    ], BankDetailsComponent);
    return BankDetailsComponent;
}());

//# sourceMappingURL=bank-details.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyValuePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the KeyValuePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var KeyValuePipe = (function () {
    function KeyValuePipe() {
    }
    KeyValuePipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeyValuePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'keys' })
    ], KeyValuePipe);
    return KeyValuePipe;
}());

//# sourceMappingURL=key-value.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ChartComponent = (function () {
    function ChartComponent(appUtils, cryptoService) {
        var _this = this;
        this.appUtils = appUtils;
        this.cryptoService = cryptoService;
        console.log('Hello ChartComponent Component');
        setTimeout(function () {
            _this.InTradeViewGraph();
        }, 1000);
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cryptoService.GetCurrencyConversionList(this.currName).then(function (res) {
            _this.currencyList = [];
            var keys = Object.keys(res);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var tmp = { name: key, value: res[key] };
                _this.currencyList.push(tmp);
            }
        }, function (error) {
            _this.appUtils.ShowToast(error, 'bottom', 6000);
        });
    };
    ChartComponent.prototype.InTradeViewGraph = function () {
        var symbol = 'COINBASE:' + this.currName + 'USD';
        //        fiat_name = localStorage.getItem('country-currency-name');
        new TradingView.widget({
            "width": 980,
            "height": 500,
            "autosize": true,
            "symbol": symbol,
            "interval": "1",
            "timezone": "Etc/UTC",
            "theme": "Light",
            "style": "1",
            "locale": "in",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "currencyGraphDiv"
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "currName", void 0);
    ChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'chart',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\components\chart\chart.html"*/'<!-- Generated template for the ChartComponent component -->\n<ion-row>\n  <ion-col>\n    <h2>{{currName}}</h2>\n    <p>Conversion Rates for 1 {{currName}} according to currencies</p>\n    <div *ngIf="currencyList" class="currencydiv">\n      <ng-container *ngFor="let currency of currencyList">\n        <p>{{currency.name}}:{{currency.value}}</p>\n      </ng-container>\n    </div>\n  </ion-col>\n</ion-row>\n<ion-row>\n  <ion-col>\n    <div id="currencyGraphDiv" style="height: 500px;">\n\n    </div>\n  </ion-col>\n</ion-row>'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\components\chart\chart.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_apputils_apputils__["a" /* AppUtils */], __WEBPACK_IMPORTED_MODULE_2__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */]])
    ], ChartComponent);
    return ChartComponent;
}());

//# sourceMappingURL=chart.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fiat_currency_fiat_currency__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__crypto_currency_crypto_currency__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_general_general__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_cryptocurrency_cryptocurrency__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_apputils_apputils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__currencyaddress_currencyaddress__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = (function () {
    function DashboardPage(auth, general, navCtrl, navParams, alertCtrl, cryptoService, appUtils) {
        this.auth = auth;
        this.general = general;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cryptoService = cryptoService;
        this.appUtils = appUtils;
        this.tabFiatCurrencyPage = __WEBPACK_IMPORTED_MODULE_2__fiat_currency_fiat_currency__["a" /* FiatCurrencyPage */];
        this.tabCryptoCurrencyPage = __WEBPACK_IMPORTED_MODULE_3__crypto_currency_crypto_currency__["a" /* CryptoCurrencyPage */];
        this.wallet = __WEBPACK_IMPORTED_MODULE_8__currencyaddress_currencyaddress__["a" /* CurrencyaddressPage */];
        // wallet = WalletPage;
        this.countryData = [];
    }
    DashboardPage.prototype.ngOnInit = function () {
        this.getCountryData();
        // this.GetCurrencyData();      
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        this.checkTwoSF();
    };
    DashboardPage.prototype.checkTwoSF = function () {
        var _this = this;
        // alert("into two step verification");
        if (this.auth.twoFactorStatus == 0) {
            setTimeout(function () {
                if (!_this.appUtils.TwoFACheckStatus) {
                    _this.auth.modalData = '2-Step Verification is Disabled';
                    _this.auth.modal();
                }
            }, 1500);
        }
    };
    DashboardPage.prototype.GetCurrencyData = function () {
        this.cryptoService.GetCryptoCurrencies().then(function (res) {
            // this.cryptoCurrencies = this.cryptoService.CryptoCurrencies;
            //console.log(this.cryptoCurrencies);
            //this.getCountryData();  
        }, function (error) {
            alert("GetCryptoError::" + error);
        });
    };
    DashboardPage.prototype.getCountryData = function () {
        /* this.general.getCountryData().then(() => {
             this.countryData = this.general.countryData;
             this.general.SelectedCountry = this.general.countryData[7];
 
             this.selectedCountryId = this.countryData[0].country_id;
             this.selectedCountryFiat = this.countryData[0].country_fiat;
             this.selectedCountryName = this.countryData[0].country_name;
             this.selectedCountryFlag = this.countryData[0].country_flag;
            // this.GetCurrencyData();
         })*/
    };
    DashboardPage.prototype.showRadio = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Country');
        for (var i = 0; i < this.countryData.length; i++) {
            if (this.selectedCountryName == this.countryData[i].country_name) {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_name,
                    value: this.countryData[i].country_name,
                    checked: true
                });
                // this.selectedCountryFlag = this.countryData[i].country_flag;
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: this.countryData[i].country_name,
                    value: this.countryData[i].country_name,
                });
                // this.selectedCountryFlag = this.countryData[i].country_flag;
                // console.log(this.selectedCountryFlag);
            }
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.selectedCountryName = data;
                for (var value in _this.countryData) {
                    if (data == _this.countryData[value].country_name) {
                        _this.general.country = _this.countryData[value].country_fiat;
                        _this.selectedCountryFlag = _this.countryData[value].country_flag;
                        break;
                    }
                }
                console.log("SelectedCountry:::" + _this.general.country);
            }
        });
        alert.present();
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\dashboard\dashboard.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title class="navbarAppHead">\n            DASHBOARD\n            <!--<span *ngIf="countryData.length != 0"><span *ngFor="let data of countryData">{{data.country_fiat}}</span></span>\n            <ion-icon name="arrow-down" float-right></ion-icon>-->\n            <!-- <ion-icon name="arrow-dropdown" float-right (click)="showRadio()"></ion-icon>\n            <span style="padding-left: 2px; padding-right: 2px;" float-right (click)="showRadio()"><img style="width: 2.2rem;" src = "{{general.countrylink}}{{selectedCountryFlag}}" /></span> -->\n        </ion-title>\n    </ion-navbar>\n    <coin-status></coin-status>\n</ion-header>\n\n<ion-content>\n    <ion-tabs>\n        <ion-tab [root]="wallet" tabTitle="wallet" tabIcon="ios-basket"></ion-tab>\n        <!-- <ion-tab [root]="tabFiatCurrencyPage" tabTitle="FIAT Currency" tabIcon="logo-bitcoin"></ion-tab> -->\n        <ion-tab [root]="tabCryptoCurrencyPage" tabTitle="Trade" tabIcon="logo-usd"></ion-tab>\n    </ion-tabs>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\dashboard\dashboard.html"*/,
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_4__providers_authenticate_authenticate__["a" /* AuthenticateProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_authenticate_authenticate__["a" /* AuthenticateProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_general_general__["a" /* GeneralProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_cryptocurrency_cryptocurrency__["a" /* CryptocurrencyProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_apputils_apputils__["a" /* AppUtils */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiatCurrencyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FiatCurrencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiatCurrencyPage = (function () {
    function FiatCurrencyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FiatCurrencyPage.prototype.ionViewDidLoad = function () {
    };
    FiatCurrencyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-fiat-currency',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\fiat-currency\fiat-currency.html"*/'<!--<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>FIAT CURRENCY</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-content>\n    <!--coin-status></coin-status-->\n  <fiat-dashboard></fiat-dashboard>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\fiat-currency\fiat-currency.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], FiatCurrencyPage);
    return FiatCurrencyPage;
}());

//# sourceMappingURL=fiat-currency.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntrypagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EntrypagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EntrypagePage = (function () {
    function EntrypagePage(events, pnkHttpService, navCtrl, navParams, auth, menuCtrl) {
        this.events = events;
        this.pnkHttpService = pnkHttpService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.menuCtrl = menuCtrl;
    }
    EntrypagePage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    EntrypagePage.prototype.ngOnInit = function () {
        if (localStorage.getItem('userData') != null) {
            // alert("typeofUser:"+typeof localStorage.getItem('userData') + ", TypeOfToken::"+typeof localStorage.getItem('token'));
            this.auth.userData = JSON.parse(localStorage.getItem('userData'));
            this.pnkHttpService.token = localStorage.getItem('token');
            //this.home.pinVerification = true;
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            if (this.auth.userData != null) {
                this.auth.loggedIn = true;
                if (this.auth.userData.userfourdigitpinstatus == 1) {
                    this.auth.userPinSetStatus = true;
                }
                else {
                    this.auth.userPinSetStatus = false;
                }
            }
            else {
            }
        }
    };
    EntrypagePage.prototype.GoTo = function (val) {
        if (val == 'login') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
                data: 'login'
            });
        }
        else if (val == 'reg') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
                data1: 'register'
            });
        }
    };
    EntrypagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-entrypage',template:/*ion-inline-start:"D:\cdwork\ionic3work\valuebit\src\pages\entrypage\entrypage.html"*/'<!--\n  Generated template for the EntrypagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <ion-grid class="entryGrid">\n    <ion-row>\n      <ion-col class="ionicLogoOuter">\n          <div class="logoOuter">\n              <img src="assets/imgs/logo2.png" class="logo"/>\n          </div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="logoHeader">\n            Valuebit\n        </ion-col>\n    </ion-row>\n    <ion-row class="entryRowBtn">\n      <ion-col class="loginBtnGrid">\n        <button ion-button round full class="loginBtn" type="button" (click)="GoTo(\'login\')">LOGIN</button>\n      </ion-col>  \n    </ion-row>\n    <ion-row class="entryRowBtn">\n      <ion-col class="loginBtnGrid">\n        <button ion-button round full class="registerBtn" type="button" (click)="GoTo(\'reg\')">REGISTER</button>\n      </ion-col>  \n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\cdwork\ionic3work\valuebit\src\pages\entrypage\entrypage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_pnkutils_pnk_http_service__["a" /* PnkHttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_authenticate_authenticate__["a" /* AuthenticateProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], EntrypagePage);
    return EntrypagePage;
}());

//# sourceMappingURL=entrypage.js.map

/***/ })

},[385]);
//# sourceMappingURL=main.js.map