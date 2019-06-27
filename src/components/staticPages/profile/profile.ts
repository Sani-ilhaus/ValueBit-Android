import { Component, OnInit } from '@angular/core';
import { PnkHttpService } from '../../../providers/pnkutils/pnk-http.service';
import { NavController, Events } from 'ionic-angular';
import { AuthenticateProvider } from '../../../providers/authenticate/authenticate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../../providers/general/general';
import { AppUtils } from '../../../providers/apputils/apputils';




/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {
  user_image: any;

  countryData: any = [];
  selectedCountry: any;
  selectedCountryName: any;
  selectedCountryFlag: any;
  private userProfile: FormGroup;
  username: any;

  constructor(public general: GeneralProvider, private alertCtrl: AlertController, private formBuilder: FormBuilder, private events: Events, private auth: AuthenticateProvider, private pnkHttpService: PnkHttpService, public navCtrl: NavController, private appUtils:AppUtils) {

    events.subscribe('imageUpload:successful', (imageUpload, component) => {
      this.afterImageUpload(imageUpload, component);
    });

    this.userProfile = this.formBuilder.group({
      Email: [this.auth.userData.user_email, Validators.requiredTrue],
      txtUserFirstName: ['', Validators.requiredTrue],
      txtUserLastName: ['', Validators.requiredTrue],
      txtUserDob: ['', Validators.requiredTrue],
      txtUserGender: ['', Validators.requiredTrue],
      numUserPhone: ['', Validators.requiredTrue],
      txtUserAddress: ['', Validators.requiredTrue],
      txtUserState: ['', Validators.requiredTrue],
      numUserPostalCode: ['', Validators.requiredTrue],
      ddlUserCountry: ['', Validators.requiredTrue],
      fupUserProfile: ['', Validators.requiredTrue],
    });

  }

  ionViewDidLoad() {
    this.countryData = this.general.countryData;
    this.username = this.auth.userData.user_name;
    //alert(this.countryData.length);
    this.appUtils.ShowLoader();
    this.auth.getUserData().then(() => {
this.appUtils.HideLoader();
      this.userProfile.patchValue({
        Email: this.auth.userData.user_email,
        txtUserFirstName: this.auth.userprofiledata.user_fname,
        txtUserLastName: this.auth.userprofiledata.user_lname,
        txtUserDob: this.auth.userprofiledata.user_dob,
        txtUserGender: this.auth.userprofiledata.user_gender,
        numUserPhone: this.auth.userprofiledata.user_contact,
        txtUserAddress: this.auth.userprofiledata.user_address,
        txtUserState: this.auth.userprofiledata.user_state,
        numUserPostalCode: this.auth.userprofiledata.user_postal_code,
        ddlUserCountry: this.auth.userprofiledata.user_country_id,
        fupUserProfile: this.auth.userData.user_image,
        // selectedCountry_id: this.general.country
      })

    }, (error) => {
      this.appUtils.HideLoader();
      this.appUtils.ShowToast(error, 'bottom', 6000);
    });
    //this.getCountryData();

    // console.log(this.userProfile.value.Email);
  }

  profileUpdateForm(formValue) {
    console.log("kamal" + formValue);
    //  return true;
    this.auth.ProfileUpdate(formValue).then(() => {
      this.auth.toastDesignClass = 'success';
      this.auth.toastMsg = "Profile Updated";
      this.auth.toast();
      this.auth.userData.user_image = this.userProfile.value.fupUserProfile
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }

  getCountryData() {
    // alert
    this.general.getCountryData().then(() => {
      this.countryData = this.general.countryData;
      this.selectedCountry = this.countryData[0].country_fiat;
      console.log(this.selectedCountry);
    })
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Country');

    for (let i = 0; i < this.countryData.length; i++) {
      if (this.selectedCountry == this.countryData[i].country_fiat) {
        alert.addInput({
          type: 'radio',
          label: this.countryData[i].country_fiat,
          value: this.countryData[i].country_fiat,
          checked: true
        });
      } else {
        alert.addInput({
          type: 'radio',
          label: this.countryData[i].country_fiat,
          value: this.countryData[i].country_fiat,
          /*checked: true*/
        });
      }
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.selectedCountry = data;
        this.general.country = this.selectedCountry;
        console.log(this.general.country);
      }
    });
    alert.present();
  }

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
  uploadDocs() {
    // alert("jjj");
    //if (this.auth.twoFactorStatus == '1') {
    this.auth.UploadUserImage("profile").then((res) => {
      this.auth.userData.user_image = res;
     // this.getImagePath();
    }, (error) => {
      this.appUtils.ShowToast(error, "bottom",6000);
    })
    // } else {
    //   this.auth.toastDesignClass = "error";
    //   this.auth.toastMsg = "Two step Verification is Not Enabled!";
    //   this.auth.toast();
    // }
  }

  getImagePath() {
    //alert("uploadeImgPath::"+this.auth.uploadImagePath);
    this.userProfile.value.fupUserProfile = this.auth.uploadImagePath;
  }

  UploadUserImage() {
    this.auth.UploadUserImage('profile');
  }

  afterImageUpload(imageUpload, component) {
    console.log(imageUpload + ' ' + component);
  }



  /*
  Update(val){
    if(this.didImageChanged){
    // alert("Value:"+JSON.stringify(val, null, 4));
    }
    this.homeService.updateUserProfile(val).then(()=>{
      this.presentToast('Profile updated successfully.');
      //this.homeService.userProfile.user_image = 
    },error =>{
      this.presentToast(error.FailureReason);
    });
  }*/

}