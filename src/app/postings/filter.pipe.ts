import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  constructor() {}

  transform(value: any, filterString: string, propName: string, unfiltered: string): any {
    if (value.length === 0 || filterString === unfiltered) {
      return value;
    }

    return value.filter(item => item[propName] === filterString);
  }
}
