import { describe, expect, it } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('shows two decimals with a dollar sign', () => {
    expect(formatPrice(28)).toBe('$28.00');
    expect(formatPrice(160.5)).toBe('$160.50');
  });

  it('adds a thousands separator', () => {
    expect(formatPrice(1234)).toBe('$1,234.00');
  });
});
