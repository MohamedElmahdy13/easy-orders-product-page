// Prices are shown like in the design: $28.00
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(amount: number): string {
  return formatter.format(amount);
}
