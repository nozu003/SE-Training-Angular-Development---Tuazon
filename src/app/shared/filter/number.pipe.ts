import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return parseInt(value);
  }
}
