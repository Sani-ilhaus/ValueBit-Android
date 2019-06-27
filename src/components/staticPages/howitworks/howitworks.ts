import { Component } from '@angular/core';

/**
 * Generated class for the HowitworksComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'howitworks',
  templateUrl: 'howitworks.html'
})
export class HowitworksComponent {

  text: string;

  constructor() {
    console.log('Hello HowitworksComponent Component');
    this.text = 'Hello World';
  }

}
