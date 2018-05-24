import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathAbs'
})
export class MathAbsPipe implements PipeTransform {
  // hiển thị giá trị tuyệt đối của số
  transform(value: any, args?: any): any {
    const newValue = value.replace(new RegExp(',', 'g'), '');
    if (Number.parseFloat(value) < 0) {
      return `${value.replace(new RegExp('-', 'g'), '')}`;
    }
    return value;
  }

}
