import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathCeil'
})
export class MathCeilPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.ceil(value);
  }

}
