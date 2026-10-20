'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const parsed = {};

  fromFormat.slice(0, -1).forEach((token, index) => {
    parsed[token] = dateParts[index];
  });

  const fullYear =
    parsed.YYYY ||
    (Number(parsed.YY) < 30 ? `20${parsed.YY}` : `19${parsed.YY}`);

  const shortYear = parsed.YY || parsed.YYYY.slice(-2);

  const parts = {
    YYYY: fullYear,
    YY: shortYear,
    MM: parsed.MM,
    DD: parsed.DD,
  };

  return toFormat
    .slice(0, -1)
    .map((token) => parts[token])
    .join(toSeparator);
}

module.exports = formatDate;
