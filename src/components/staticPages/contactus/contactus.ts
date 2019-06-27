import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  GeneralProvider} from '../../../providers/general/general';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../../../pages/dashboard/dashboard';
/**
 * Generated class for the ContactusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contactus',
  templateUrl: 'contactus.html'
})
export class ContactusComponent {

  text: string;
  private contactusform: FormGroup;

  succesmsg: any;
  

  constructor(private formBuilder: FormBuilder, private generalservice: GeneralProvider,public navCtrl: NavController) {
    console.log('Hello ContactusComponent Component');
    this.text = 'Hello World';
   this.contactusform = this.formBuilder.group({
      txtfirstName: ['', Validators.required],
      txtLastName: ['', Validators.required],
      txtEmail: ['',  Validators.compose([Validators.required, Validators.minLength(6),
        Validators.pattern('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'),
        ])],
      txtPhone: ['', Validators.compose([Validators.minLength(7), Validators.pattern('[0-9]*'), Validators.required])],
      txtMessage: ['', Validators.required],
   });
  }
  ContactUs(formvalue){
   // alert(JSON.stringify(formvalue));
   // console.log("into the ts file");
    this.generalservice.SaveContactUs().then((res)=>{
        if(res){
         // alert(res);
          this.succesmsg = this.generalservice.succussres;
          this.generalservice.toastDesignClass = 'success';
          this.generalservice.toastMsg = this.succesmsg;
          this.generalservice.toast();
          setTimeout(() =>{
            this.navCtrl.setRoot(DashboardPage);
          },5000);

        }
       
    }, (error) => {
      console.log(error);
   });
  }
}
