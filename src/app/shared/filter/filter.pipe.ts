import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter(function (data: any) {
      return JSON.stringify(data).toLowerCase().includes(args.toLowerCase());
    });
  }
}
