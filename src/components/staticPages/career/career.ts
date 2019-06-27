import { Component } from '@angular/core';

/**
 * Generated class for the CareerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'career',
  templateUrl: 'career.html'
})
export class CareerComponent {

  text: string;

  constructor() {
    console.log('Hello CareerComponent Component');
    this.text = 'Hello World';
  }

}
