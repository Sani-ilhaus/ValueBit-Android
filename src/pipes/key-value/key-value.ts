import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the KeyValuePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({name: 'keys'})
export class KeyValuePipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
