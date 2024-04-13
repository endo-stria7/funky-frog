import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return '0';
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(?<temp1>\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);
  return item
    ? (num / item.value).toFixed(digits ?? 1).replace(rx, '$1') + item.symbol
    : '0';
}
export const rdItemsPerPages = (
  maximum = 100,
  minimum = 10,
  requiredMaxLength = 10,
) =>
  Array.from(
    new Set(
      Array.from(
        { length: 20 },
        () => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum,
      ),
    ),
  ).slice(0, Math.floor(Math.random() * (requiredMaxLength - 1 + 1)) + 1);

export function sliceIntoChunks(arr: unknown[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}
