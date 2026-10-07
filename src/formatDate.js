'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);
  const values = {};

  for (let i = 0; i < dateParts.length; i++) {
    values[fromFormat[i]] = dateParts[i];
  }

  if (toFormat.includes('YY') && values.YYYY) {
    values.YY = values.YYYY.slice(-2);
  }

  if (toFormat.includes('YYYY') && values.YY) {
    const year = Number(values.YY);

    values.YYYY = year < 30 ? `20${values.YY}` : `19${values.YY}`;
  }

  const toSeparator = toFormat[toFormat.length - 1];
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(values[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
