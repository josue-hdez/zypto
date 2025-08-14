const LOCALE = "en-US";
const CURRENCY = "USD";

/**
 * Formats a number into a localized string based on the given style.
 *
 * @param {number} value - The numeric value to format.
 * @param {number} fractionDigits - Maximum number of decimal places to include.
 * @param {string} style - Formatting style: "decimal", "currency", "percent", etc.
 * @returns {string} The formatted number as a string according to the locale and style.
 */
function formatValue(value, fractionDigits, style) {
  const options = {
    style,
    maximumFractionDigits: fractionDigits,
  };

  if (style === "currency") {
    options.currency = CURRENCY;
  }

  if (style === "percent") {
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
    value /= 100;
  }

  return value.toLocaleString(LOCALE, options);
}

/**
 * Formats a number into a human-readable form, supporting large units (K, M, B, T),
 * small numbers between 0 and 1, and various styles (decimal, currency, percent).
 *
 * @param {number} num - The number to format.
 * @param {string} [style="decimal"] - Formatting style: "decimal", "currency", "percent", etc.
 * @param {boolean} [includeThousands=false] - Whether to include the "K" unit for thousands.
 * @returns {string} A formatted string representing the number, or "-" if input is invalid.
 */
export function formatNumber(num, style = "decimal", includeThousands = false) {
  if (typeof num !== "number" || isNaN(num)) return "-";

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
  ];

  if (includeThousands) {
    units.push({ value: 1e3, symbol: "K" });
  }

  // Handle trillions, billions, millions
  for (const { value, symbol } of units) {
    if (num >= value) {
      return formatValue(num / value, 2, style) + symbol;
    }
  }

  // Handle numbers between 0 and 1
  if (num > 0 && num < 1) {
    const roundedTo4 = parseFloat(
      num.toLocaleString(LOCALE, { maximumFractionDigits: 4 })
    );
    const fractionDigits =
      roundedTo4 === 0 ? Math.max(num.toString().length - 2, 4) : 4;
    return formatValue(num, fractionDigits, style);
  }

  // Default formatting
  return formatValue(num, 2, style);
}
