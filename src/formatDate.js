'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const SHORT_YEAR_THRESHOLD = 30;

function toShortYear(year) {
  return year.slice(-2);
}

function toFullYear(year) {
  return Number(year) < SHORT_YEAR_THRESHOLD ? `20${year}` : `19${year}`;
}

function formatDate(date, fromFormat, toFormat) {
  const fromTokens = fromFormat.slice(0, -1);
  const toTokens = toFormat.slice(0, -1);
  const separator = toFormat.at(-1);

  const values = {};

  date.split(fromFormat.at(-1)).forEach((value, index) => {
    values[fromTokens[index]] = value;
  });

  const result = toTokens.map((token) => {
    if (token in values) {
      return values[token];
    }

    return token === 'YY' ? toShortYear(values.YYYY) : toFullYear(values.YY);
  });

  return result.join(separator);
}

module.exports = formatDate;
