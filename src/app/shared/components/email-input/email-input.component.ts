import { Component, forwardRef, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'email-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true,
    },
  ],
})
export class EmailInputComponent implements ControlValueAccessor {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  private suffixes = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com.br',
    'uol.com.br',
    'terra.com.br',
    'icloud.com',
  ];

  // Callback functions for CVA
  onChange: any = () => {};
  onTouched: any = () => {};

  /**
   * Observable que filtra os sufixos baseados no que o usuário digitou após o "@".
   */
  filteredOptions$ = this.emailControl.valueChanges.pipe(
    startWith(''),
    map((value) => this.filterSuffixes(value || '')),
  );

  private filterSuffixes(value: string): string[] {
    const atIndex = value.indexOf('@');
    if (atIndex === -1) return [];

    const username = value.substring(0, atIndex);
    const domainPart = value.substring(atIndex + 1).toLowerCase();

    return this.suffixes
      .filter((suffix) => suffix.startsWith(domainPart))
      .map((suffix) => `${username}@${suffix}`);
  }

  // Métodos ControlValueAccessor
  writeValue(value: string): void {
    this.emailControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.emailControl.valueChanges.subscribe((val) => {
      this.onChange(val);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.emailControl.disable() : this.emailControl.enable();
  }

  onBlur(): void {
    this.onTouched();
  }
}
