import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  constructor() {}

  transform(value: Array<any>, filterString: string, propName: string, unfiltered: string): Array<any> {
    if (value.length === 0 || filterString === unfiltered) {
      return value;
    }

    return value.filter(item => item[propName] === filterString);
  }
}
