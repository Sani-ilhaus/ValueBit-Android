import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {HomePage} from "../home/home";
import { EntrypagePage } from '../entrypage/entrypage';
/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  
  @ViewChild(Slides) slides: Slides;
  showStartBtn:boolean = false;
  currentIndex:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  GoToHome(){
    this.navCtrl.setRoot(EntrypagePage);
  }

  slideChanged($event) {
    this.currentIndex = this.slides.getActiveIndex();
    if(this.currentIndex == 3 && $event.swipeDirection == 'next'){
      this.navCtrl.setRoot(EntrypagePage);
    }
  }

}
