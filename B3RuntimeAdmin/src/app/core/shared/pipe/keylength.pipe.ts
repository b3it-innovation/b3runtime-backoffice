import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keylength'
})
export class KeylengthPipe implements PipeTransform {

  transform(value: any, args?: any): number {
    if (value) {
      return Object.keys(value).length;
    } else {
      return 0;
    }
  }

}
