import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalsCounterComponent } from './signals-counter';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SignalsCounterComponent', () => {
  let component: SignalsCounterComponent;
  let fixture: ComponentFixture<SignalsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with specific items and total', () => {
    expect(component.itens().length).toBe(2);
    expect(component.total()).toBe(20); // (1*10) + (2*5) = 20
  });

  it('should increment item quantity and update total', () => {
    component.adicionar(1); // Café: 1 -> 2
    expect(component.itens().find((i) => i.id === 1)?.quantidade).toBe(2);
    expect(component.total()).toBe(30); // (2*10) + (2*5) = 30
  });

  it('should decrement item quantity and update total', () => {
    component.remover(2); // Pão: 2 -> 1
    expect(component.itens().find((i) => i.id === 2)?.quantidade).toBe(1);
    expect(component.total()).toBe(15); // (1*10) + (1*5) = 15
  });

  it('should not decrement below zero', () => {
    component.remover(1); // Café: 1 -> 0
    component.remover(1); // Café: 0 -> 0
    expect(component.itens().find((i) => i.id === 1)?.quantidade).toBe(0);
    expect(component.total()).toBe(10); // (0*10) + (2*5) = 10
  });

  it('should emit the totalMudou output when total changes', async () => {
    const emitSpy = vi.spyOn(component.totalMudou, 'emit');

    component.adicionar(1);

    // Efeitos rodam de forma assíncrona ou no próximo ciclo de detecção em testes
    // No Angular 19+ / Zoneless, detectChanges resolve sinais
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(30);
  });
});
