import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAbs'
})
export class FormatAbsPipe implements PipeTransform {
  // hiển thị giá trị tuyệt đối của số, nếu là số âm thì thêm ()
  transform(value: any, args?: any): any {
    const newValue = value.replace(new RegExp(',', 'g'), '');
    if (Number.parseFloat(value) < 0) {
      return `(${value.replace(new RegExp('-', 'g'), '')})`;
    }
    return value;
  }

}
