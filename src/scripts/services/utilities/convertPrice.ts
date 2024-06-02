export function convertPrice(centAmount: number, fractionDigits: number): string {
  const priceWithoutCent = centAmount / 10 ** fractionDigits;
  const priceStr = `$${String(priceWithoutCent.toFixed(2))}`;
  return priceStr;
}
