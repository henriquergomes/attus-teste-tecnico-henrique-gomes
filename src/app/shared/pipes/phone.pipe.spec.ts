import { PhonePipe } from './phone.pipe';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PhonePipe', () => {
  let pipe: PhonePipe;

  beforeEach(() => {
    pipe = new PhonePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a 10-digit landline phone', () => {
    const raw = '1133334444';
    expect(pipe.transform(raw)).toBe('(11) 3333-4444');
  });

  it('should format an 11-digit mobile phone', () => {
    const raw = '11999998888';
    expect(pipe.transform(raw)).toBe('(11) 99999-8888');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return cleaned original if length is neither 10 nor 11', () => {
    expect(pipe.transform('123')).toBe('123');
    expect(pipe.transform('123456789012')).toBe('123456789012');
  });

  it('should strip special characters before formatting', () => {
    expect(pipe.transform('(11) 99999-8888')).toBe('(11) 99999-8888'); // matches length 11 after strip
  });
});
