import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUtils } from '../../providers/apputils/apputils';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ChangepinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'changepin',
  templateUrl: 'changepin.html'
})
export class ChangepinComponent {

  
  changePinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appUtils:AppUtils, private auth:AuthenticateProvider, private viewCtrl: ViewController) {
    console.log('Hello ChangepinComponent Component');
    this.changePinForm = this.formBuilder.group({
      txtNewAppInitPin: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[1-9][0-9]*$')])],
      txtOldAppInitPin: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[1-9][0-9]*$')])],
    });
  }
  getValue($event){
    if ($event.target.value.length == 4) {

    }
    else if($event.target.value.length > 4){
      this.appUtils.ShowToast("Please Enter only four digt pin","bottom", 6000);
    }
  }
  ChangePin(){
    if(this.changePinForm.valid){
    this.appUtils.ShowLoader();
    this.auth.ChangePin(this.changePinForm.value).then((res)=>{
      this.appUtils.HideLoader();
      this.appUtils.ShowToast("App Pin changed successfully.", "bottom", 6000)
      this.CloseModal();
    }, (error)=>{
      this.appUtils.HideLoader();
      this.appUtils.ShowToast(error,'bottom',6000);
    })
  }
  else{
    this.appUtils.ShowToast("Please enter valid pins", 'bottom',6000);
  }
  }
  CloseModal(){
    this.viewCtrl.dismiss();
  }
}
