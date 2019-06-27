import { Component } from '@angular/core';

/**
 * Generated class for the SupportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'support',
  templateUrl: 'support.html'
})
export class SupportComponent {

  text: string;

  constructor() {
    console.log('Hello SupportComponent Component');
    this.text = 'Hello World';
  }

}
