import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const stringValue = value.toString().replace(/\D/g, '');

    if (stringValue.length === 10) {
      return `(${stringValue.substring(0, 2)}) ${stringValue.substring(2, 6)}-${stringValue.substring(6)}`;
    }

    if (stringValue.length === 11) {
      return `(${stringValue.substring(0, 2)}) ${stringValue.substring(2, 7)}-${stringValue.substring(7)}`;
    }

    return stringValue;
  }
}
