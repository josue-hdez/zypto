/**
 * Formats a number into a human-readable US Dollar currency string.
 *
 * Features:
 * - Abbreviates large numbers using standard suffixes:
 *   - "T" for trillions (≥ 1e12)
 *   - "B" for billions (≥ 1e9)
 *   - "M" for millions (≥ 1e6)
 *   - Optionally "K" for thousands (≥ 1e3) if `includeThousands` is true
 * - Handles small numbers between 0 and 1 with high precision
 * - Returns a dash ("-") for invalid or non-numeric inputs
 *
 * @param {number} num - The numeric value to be formatted.
 * @param {boolean} [includeThousands=false] - Whether to include "K" for thousands.
 * @returns {string} - A formatted USD currency string, or "-" for invalid inputs.
 *
 * @example
 * formatNumberToCurrency(1234567890); // "$1,234.57M"
 * formatNumberToCurrency(0.00001234); // "$0.00001234"
 * formatNumberToCurrency(100); // "$100.00"
 * formatNumberToCurrency("abc"); // "-"
 **/
export function formatNumberToCurrency(num, includeThousands = false) {
  if (typeof num !== "number" || isNaN(num)) return "-";

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
  ];

  if (includeThousands) {
    units.push({ value: 1e3, symbol: "K" });
  }

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
