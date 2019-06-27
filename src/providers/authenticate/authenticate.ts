import { Injectable } from '@angular/core';
import { PnkHttpService } from '../pnkutils/pnk-http.service';
import { ToastController, ModalController, NavParams } from 'ionic-angular';
import { ModalComponent } from '../../components/modal/modal';
import { SpinnerComponent } from '../../components/spinner/spinner';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';

declare let cordova: any;

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticateProvider {
    userImageLink: any = "";
    backHardwareBtn: any;
    temp: any;
    toastMsg: any = '';
    toastDesignClass: any;
    toastTimeOut: any = 3000;
    valuebit_token: any;
    userLoginStatus: any;
    twoFactorMode: any;
    twoFactorStatus: any;
    userFourDigitPin: any = '';
    userPinSetStatus = false;
    modalData: any;
    disableForm = false;
    userData: any = null;
    loggedIn = false;
    uploadImagePath: any = null;
    spinnerEnable: any;
    twoSFPassVerificationStatus = false;
    lastImage: string = null;
    loading: Loading;
    userKycData: any;
    bankDetails: any;
    tempImagePath: string;
    imgName: string;
    userprofiledata: any;
    TwoFACheckStatus: boolean = false;

    constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, private pnkHttpService: PnkHttpService, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingCtrl: LoadingController) {
        //this.userImageLink         = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
    }

    checkUserName(username) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("usercheckunique/user_name/" + username, '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {

                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }


    checkEmail(email) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("usercheckunique/user_email/" + email, '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.uniqueuser.value == "SUCCESS") {

                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    getUserData() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("userprofiledetails", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userprofiledata.rows.length > 0) {
                            this.userprofiledata = response.userprofiledata.rows[0];
                        }
                        else {
                            reject("No data found");
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    ProfileUpdate(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("userprofiledetails", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userprofileupdated.value == 'SUCCESS') {

                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    Register(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("usersignup", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.registerstatus.value == 'SUCCESS') {
                            this.temp = null;
                            this.temp = response.activationkeymessege.value;
                        }
                        else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    Login(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("login", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userloginstatus.value == "SUCCESS") {
                            this.setToken(response.valuebit_token.value);
                            //this.valuebit_token = response.valuebit_token.value;
                            this.userLoginStatus = response.userloginstatus.value;
                            this.twoFactorMode = response.twofactormode.value;
                            this.twoFactorStatus = response.twofactorstatus.value;
                            this.userData = response.userdata;

                            localStorage.setItem('userData', JSON.stringify(this.userData));

                            if (response.userdata.userfourdigitpinstatus == 1) {
                                this.userPinSetStatus = true;
                            } else {
                                this.userPinSetStatus = false;
                            }
                            if (localStorage.getItem('userData')) {
                                let userName: any = localStorage.getItem('userData');
                                userName = JSON.parse(userName);
                                userName = userName.user_name;
                                // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                            }
                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    ResetPasswordByEmail(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServerWithoutAuth("userresetpassword", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.forgotpassword.value == "SUCCESS") {
                            this.toastMsg = response.emailsent.value;

                        } else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });

    }

    pinVerification(val) {
        return new Promise((resolve, reject) => {
            ///alert("USerData:"+ this.userData.userfourdigitpinstatus)
            if (this.userData.userfourdigitpinstatus == 1) {
                this.pnkHttpService.PostSynchronousAjaxFromServer("apppinverification", val).subscribe(response => {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.userfourdigitpin.value == "SUCCESS") {
                                //if (localStorage.getItem('userData')) {
                                if (this.userData) {
                                    // let userName: any = localStorage.getItem('userData');
                                    // userName = JSON.parse(userName);
                                    let userName = this.userData.user_name;
                                    // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                                }
                            } else {
                                reject(response.FailureReason.value);
                            }
                        }
                        else {
                            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                        resolve(0);
                    }
                    else {
                        this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, error => {
                    reject(error);
                })
            }
            else {
                this.pnkHttpService.PutSynchronousAjaxFromServer("apppinverification", val).subscribe(response => {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.userfourdigitpin.value == "SUCCESS") {
                                if (localStorage.getItem('userData')) {
                                    let userName: any = localStorage.getItem('userData');
                                    userName = JSON.parse(userName);
                                    userName = userName.user_name;
                                    // this.userImageLink = this.pnkHttpService.AssetsUrl+'storage/uploads/user_' + userName + '/';
                                }
                            } else {
                                reject(response.FailureReason.value);
                            }
                        }
                        else {
                            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                        resolve(0);
                    }
                    else {
                        this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, error => {
                    reject("Connection not found");
                })
            }

        });
    }

    pinSet(val) {
        //  alert("sdsddd:"+ this.userData.userfourdigitpinstatus)
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("apppinverification", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userfourdigitpinstatus.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    twoStepVerification(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/manual", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    console.log("TwoFAResponse::"+JSON.stringify(response,null,4));
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.verifytwofactorcode.value == "SUCCESS") {
                            resolve(response.verifytwofactorcode.successmessege);
                        } else {
                            reject(response.FailureReason.value);
                            //reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    // resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    twoSFPasswordVerify(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServer("twofactorauthentication/manual", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twofactorcodeauthorisation.value == "SUCCESS") {
                            // this.toastMsg = response.twofactorcodeauthorisation.successmessege;
                            // this.toastDesignClass = "success";
                            // this.toast();
                            this.twoFactorMode = 'disabled'
                            resolve(response.twofactorcodeauthorisation.successmessege)
                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    // resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    twoSFPasswordDisable(data) {
        return new Promise((resolve, reject) => {
            if (data != undefined)
                this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/disable", data).subscribe(response => {
                    if ((response) && (typeof response) != "string") {
                        if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                            if (response.disabletwofactorcode != undefined) {
                                if (response.disabletwofactorcode.value == "SUCCESS") {
                                    resolve(response.disabletwofactorcode.successmessege);
                                } else {
                                    reject(response.FailureReason.value);
                                }
                            }
                        }
                        else {
                            this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                            reject(0);
                        }
                        
                    }
                    else {
                        this.pnkHttpService.ParseError();
                        reject(1);
                    }
                }, error => {
                    reject('Unable to Connect To Internet');
                })
        });
    }

    postBankDetails(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServer("userbankdetails", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userbankdata.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    getBankDetails() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("userbankdetails", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userbankdata.rows.length > 0) {
                            this.bankDetails = response.userbankdata.rows;
                        } else {
                            reject('no data available');
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    GetKycDetails() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("userkycdetails", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userkycdata.rows.length > 0) {
                            console.log(response.userkycdata.rows);
                            this.userKycData = response.userkycdata.rows[0];
                        }
                        else {
                            if (response.FailureReason != undefined)
                                reject(response.FailureReason.value);
                            else
                                reject("No Kyc details availbale till now.");
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    postKycDetails(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PostSynchronousAjaxFromServer("userkycdetails", val).subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userkycdata.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    kycDetails(val) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("twofactorauthentication/disabled/" + val, '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.disabletwofactorcode.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

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

    appInit() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("appinit", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.userloginstatus.value == "SUCCESS") {
                            this.valuebit_token = response.valuebit_token.value;
                            this.userLoginStatus = response.userloginstatus.value;
                            this.twoFactorMode = response.twofactormode.value;
                            this.twoFactorStatus = response.twofactorstatus.value;
                            this.userData = response.userdata;
                            this.setToken(response.valuebit_token.value);
                            localStorage.setItem('userData', JSON.stringify(this.userData));
                            if (response.userdata.userfourdigitpinstatus == 1) {
                                this.userPinSetStatus = true;
                            } else {
                                this.userPinSetStatus = false;
                            }
                        } else {
                            this.setToken(null);
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    UploadUserImage(imgType) {
        return new Promise((resolve, reject) => {
            let actionSheet = this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, imgType).then((res) => {
                                resolve(res);
                            }, (error) => {
                                this.presentToast(error);
                            });
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.CAMERA, imgType).then(() => {
                                resolve();
                            }, (error) => {
                                this.presentToast('An error occured.');
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            });
            actionSheet.present();
        });
    }

    public takePicture(sourceType, imgType) {
        return new Promise((resolve, reject) => {
            let options = {
                quality: 100,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            this.camera.getPicture(options).then((imagePath) => {
                if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    this.filePath.resolveNativePath(imagePath)
                        .then(filePath => {
                            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgType).then((imgRes) => {
                                resolve(imgRes);
                            });
                        });
                } else {
                    let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgType).then((imgRes) => {
                        resolve(imgRes);
                    });
                }
            }, (err) => {
                //this.presentToast('Error while selecting image.');
                reject(err);
            });
        });
    }

    private createFileName() {
        let d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    private copyFileToLocalDir(namePath, currentName, newFileName, imgType) {
        return new Promise((resolve, reject) => {
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
                this.lastImage = newFileName;
                this.uploadImage(imgType).then((imgUploadRes) => {
                    resolve(imgUploadRes);
                });
            }, error => {
                //this.presentToast('Error while storing file.');
                reject(error);
            });
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage(imgType) {
        return new Promise((resolve, reject) => {
            this.uploadImagePath = null;
            let url;
            if (imgType)
                url = this.pnkHttpService.ServicesUrl + "useruploadimage/" + this.userData.user_name +"/"+imgType;
            else
                url = this.pnkHttpService.ServicesUrl + "useruploadimage/" + this.userData.user_name;
            let targetPath = this.pathForImage(this.lastImage);
            let filename = this.lastImage;
            let options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': filename }
            };

            const fileTransfer: TransferObject = this.transfer.create();

            this.loading = this.loadingCtrl.create({
                content: 'Uploading...',
            });
            this.loading.present();
            //alert('targetPath'+targetPath+', url'+ url+', options'+ options);
            fileTransfer.upload(targetPath, url, options).then(data => {
                //alert(JSON.stringify(data,null,4));
                this.loading.dismissAll();
                let tempData;
                try {
                    tempData = JSON.parse(data.response);
                } catch (e) {
                    this.presentToast("Error: " + e);
                }
                if (tempData.uploadstatus == 'SUCCESS') {
                    this.presentToast('Image successfully uploaded.');
                    this.tempImagePath = targetPath;
                    this.imgName = filename;
                    this.uploadImagePath = this.imgName;
                    
                    resolve(this.imgName);
                    //this.backHardwareBtn();
                    //this.homeService.userProfile.user_image = this.homeService.tempImagePath + ''+this.imgName;
                    //this.rForm.value.fupUserImage = this.imgName;

                }
                else {
                    //this.presentToast(tempData.FailureReason);
                    reject(tempData.FailureReason);
                }
            }, err => {
                //alert(JSON.stringify(err,null,4));
                this.loading.dismissAll();
                //this.backHardwareBtn();
                //this.presentToast('Error while uploading file.');
                reject(err);
            });
        });
    }

    toast() {
        let toast = this.toastCtrl.create({
            message: this.toastMsg,
            duration: this.toastTimeOut,
            dismissOnPageChange: true,
            cssClass: this.toastDesignClass,
            position: 'top'
        });
        setTimeout(() => {
            this.disableForm = false;
            this.toastMsg = '';
            this.toastDesignClass = '';
        }, this.toastTimeOut);
        toast.present();
    }

    twoSFVerify() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("twosfverify", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {
                            this.twoFactorMode = response.twofactormode.value;
                            this.twoFactorStatus = response.twofactorstatus.value;
                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    userProfileDetails() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.GetAjaxFromServer("userprofiledetails", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    userProfileDetailsUpdate() {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("userprofiledetails", '').subscribe(response => {
                if ((response) && (typeof response) != "string") {
                    if (response.PinakaResponse.ServerStatus.value == "SUCCESS") {
                        if (response.twosfverify.value == "SUCCESS") {

                        } else {
                            reject(response.FailureReason.value);
                        }
                    }
                    else {
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

    modal() {
        let profileModal = this.modalCtrl.create(ModalComponent, {
            modalData: this.modalData,
            twostepStatus: this.twoFactorMode
        });
        profileModal.present();
    }

    spinner() {
        /*this.backHardwareBtn = this.platform.registerBackButtonAction(() => {

        });*/
        this.spinnerEnable = this.modalCtrl.create(SpinnerComponent);
        this.spinnerEnable.present();
    }

    setToken(token) {
        this.pnkHttpService.token = token;
        this.valuebit_token = token;
        localStorage.setItem('token', token);
    }
    ChangePin(pinSet) {
        return new Promise((resolve, reject) => {
            this.pnkHttpService.PutSynchronousAjaxFromServer("apppin/changeapppin", pinSet).subscribe(response => {
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
                        this.pnkHttpService.HandlePinakaError(response.PinakaResponse);
                        reject(0);
                    }
                    //resolve(0);
                }
                else {
                    this.pnkHttpService.ParseError();
                    reject(1);
                }
            }, error => {
                reject('Unable to Connect To Internet');
            })
        });
    }

}
