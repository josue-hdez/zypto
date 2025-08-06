/**
 * Formats a number into a human-readable US Dollar currency string.
 *
 * - Large numbers are shortened with appropriate units:
 *   - Trillions (T), Billions (B), Millions (M)
 * - Numbers between 0 and 1 are formatted with up to 4 decimal places,
 *   or more if needed to avoid rounding to zero.
 * - Invalid or non-numeric values return a dash ("-").
 *
 * @param {number} num - The number to format.
 * @returns {string} - The formatted currency string or "-" if invalid input.
 *
 * @example
 * formatNumberToCurrency(1234567890); // "$1,234.57M"
 * formatNumberToCurrency(0.00001234); // "$0.00001234"
 * formatNumberToCurrency(100); // "$100.00"
 * formatNumberToCurrency("abc"); // "-"
 **/
export function formatNumberToCurrency(num) {
  if (typeof num !== "number" || isNaN(num)) return "-";

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
  ];

  const currencyOptions = (options) => ({
    style: "currency",
    currency: "USD",
    ...options,
  });

  for (const { value, symbol } of units) {
    if (num >= value) {
      const shortened = num / value;
      return shortened.toLocaleString("en-US", currencyOptions({})) + symbol;
    }
  }

  if (num > 0 && num < 1) {
    const formatted = num.toLocaleString("en-US", { maximumFractionDigits: 4 });
    const parsed = parseFloat(formatted);

    return parsed === 0
      ? num.toLocaleString(
          "en-US",
          currencyOptions({ maximumFractionDigits: 100 })
        )
      : num.toLocaleString(
          "en-US",
          currencyOptions({ maximumFractionDigits: 4 })
        );
  }

  return num.toLocaleString("en-US", currencyOptions({}));
}
