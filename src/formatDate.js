'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const parsed = {};

  for (let i = 0; i < 3; i += 1) {
    parsed[fromFormat[i]] = dateParts[i];
  }

  if (parsed.YYYY && toFormat.includes('YY')) {
    parsed.YY = parsed.YYYY.slice(-2);
  }

  if (parsed.YY && toFormat.includes('YYYY')) {
    const year = Number(parsed.YY);

    parsed.YYYY = year < 30 ? `20${parsed.YY}` : `19${parsed.YY}`;
  }

  const resultParts = [];

  for (let i = 0; i < 3; i += 1) {
    resultParts.push(parsed[toFormat[i]]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
