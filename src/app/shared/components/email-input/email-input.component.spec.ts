import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailInputComponent } from './email-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('EmailInputComponent', () => {
  let component: EmailInputComponent;
  let fixture: ComponentFixture<EmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailInputComponent, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should implement ControlValueAccessor writeValue', () => {
    component.writeValue('test@gmail.com');
    expect(component.emailControl.value).toBe('test@gmail.com');
  });

  it('should report validity based on internal control', () => {
    component.emailControl.setValue('invalid');
    expect(component.emailControl.valid).toBe(false);

    component.emailControl.setValue('valid@test.com');
    expect(component.emailControl.valid).toBe(true);
  });

  it('should suggest domains when @ is typed', () => {
    let suggestions: string[] = [];
    component.filteredOptions$.subscribe((s) => (suggestions = s));

    component.emailControl.setValue('user@gm');

    expect(suggestions).toContain('user@gmail.com');
    expect(suggestions.length).toBe(1);
  });

  it('should show all domains when only @ is typed', () => {
    let suggestions: string[] = [];
    component.filteredOptions$.subscribe((s) => (suggestions = s));

    component.emailControl.setValue('user@');

    expect(suggestions.length).toBeGreaterThan(1);
    expect(suggestions).toContain('user@gmail.com');
    expect(suggestions).toContain('user@outlook.com');
  });

  it('should call onChange callback when internal value changes', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);

    component.emailControl.setValue('new@test.com');

    expect(spy).toHaveBeenCalledWith('new@test.com');
  });

  it('should call onTouched callback on blur', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);

    component.onBlur();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable internal control when setDisabledState is called', () => {
    component.setDisabledState(true);
    expect(component.emailControl.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.emailControl.disabled).toBe(false);
  });
});
