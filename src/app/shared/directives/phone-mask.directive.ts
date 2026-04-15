import { Directive, HostListener, inject, AfterViewInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements AfterViewInit {
  private ngControl = inject(NgControl, { optional: true });
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    // Formata o valor inicial (útil para edição)
    setTimeout(() => {
      this.formatAndUpdate(this.el.nativeElement.value);
    });

    // Escuta mudanças de valor programáticas
    this.ngControl?.valueChanges?.subscribe((value) => {
      this.formatAndUpdate(value);
    });
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    this.formatAndUpdate(event.target.value);
  }

  private formatAndUpdate(value: string): void {
    if (!value && value !== '') return;

    const rawValue = value.replace(/\D/g, '').substring(0, 11);
    const formattedValue = this.formatPhone(rawValue);

    // Atualiza o elemento visual
    this.el.nativeElement.value = formattedValue;

    // Atualiza o controle do formulário com o valor bruto
    if (this.ngControl?.control && this.ngControl.control.value !== rawValue) {
      this.ngControl.control.setValue(rawValue, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      });
    }
  }

  private formatPhone(value: string): string {
    if (!value) return '';
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 6) return `(${value.substring(0, 2)}) ${value.substring(2)}`;

    // Lógica para 10 dígitos: (XX) XXXX-XXXX
    if (value.length <= 10) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    }

    // Lógica para 11 dígitos (9º dígito): (XX) XXXXX-XXXX
    return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
  }
}
