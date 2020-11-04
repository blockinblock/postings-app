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

    // Rewrite ??? MDN array filter
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
