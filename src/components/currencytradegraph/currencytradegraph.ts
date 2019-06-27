import { Component, ViewChild } from '@angular/core';
import { AppUtils } from '../../providers/apputils/apputils';
import { ViewController, NavParams, Slides } from 'ionic-angular';
declare let TradingView: any;
/**
 * Generated class for the CurrencytradegraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'currencytradegraph',
    templateUrl: 'currencytradegraph.html'
})
export class CurrencytradegraphComponent {

    title: string;
    modalData: any;
    segmentData: any;

    @ViewChild('graphSlide') slider: Slides;

    constructor(private params: NavParams, private appUtils: AppUtils, private viewCtrl: ViewController) {
        console.log('Hello CurrencytradegraphComponent Component');

        this.modalData = this.params.get('modalData');
        this.segmentData = '0';
        this.title = this.modalData.curr_code;
    }
    SelectedTab(ind) {
        this.slider.slideTo(ind);
    }
    ionViewDidLoad() {
        document.getElementById('chart').classList.add('segment-activated');
    }
    
    ChangeSlide($event) {
        // alert($event);
        this.segmentData = $event._snapIndex.toString();
      }
    CloseModal(){
        this.viewCtrl.dismiss();
    }
}
