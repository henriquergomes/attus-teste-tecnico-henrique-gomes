import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true,
})
export class CpfPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const stringValue = value.toString().replace(/\D/g, '');

    if (stringValue.length !== 11) {
      return stringValue; // Retorna o valor original se não tiver 11 dígitos
    }

    return `${stringValue.substring(0, 3)}.${stringValue.substring(3, 6)}.${stringValue.substring(6, 9)}-${stringValue.substring(9, 11)}`;
  }
}
