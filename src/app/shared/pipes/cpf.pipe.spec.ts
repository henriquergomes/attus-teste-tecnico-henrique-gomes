import { CpfPipe } from './cpf.pipe';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CpfPipe', () => {
  let pipe: CpfPipe;

  beforeEach(() => {
    pipe = new CpfPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid 11-digit CPF string', () => {
    const raw = '12345678900';
    const formatted = pipe.transform(raw);
    expect(formatted).toBe('123.456.789-00');
  });

  it('should format a valid 11-digit CPF number', () => {
    const raw = 12345678900;
    const formatted = pipe.transform(raw);
    expect(formatted).toBe('123.456.789-00');
  });

  it('should return empty string if value is null or undefined', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return original cleaned string if length is not 11', () => {
    const rawShort = '123456';
    expect(pipe.transform(rawShort)).toBe('123456');

    const rawLong = '1234567890012';
    expect(pipe.transform(rawLong)).toBe('1234567890012');
  });
});
