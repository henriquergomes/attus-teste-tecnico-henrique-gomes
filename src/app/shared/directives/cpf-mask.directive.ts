import { Directive, HostListener, inject, AfterViewInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]',
  standalone: true,
})
export class CpfMaskDirective implements AfterViewInit {
  private ngControl = inject(NgControl, { optional: true });
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    // Formata o valor inicial (útil para edição)
    setTimeout(() => {
      this.formatAndUpdate(this.el.nativeElement.value);
    });

    // Escuta mudanças de valor programáticas (ex: patchValue)
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
    const formattedValue = this.formatCpf(rawValue);

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

  private formatCpf(value: string): string {
    if (!value) return '';
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.substring(0, 3)}.${value.substring(3)}`;
    if (value.length <= 9)
      return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`;
    return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
  }
}
