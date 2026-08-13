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
  const dateByFormat = {};

  for (let i = 0; i < 3; i += 1) {
    dateByFormat[fromFormat[i]] = dateParts[i];
  }

  if (dateByFormat.YYYY !== undefined) {
    dateByFormat.YY = dateByFormat.YYYY.slice(-2);
  }

  if (dateByFormat.YY !== undefined) {
    const century = Number(dateByFormat.YY) < 30 ? '20' : '19';

    dateByFormat.YYYY = century + dateByFormat.YY;
  }

  const result = [];

  for (let i = 0; i < 3; i += 1) {
    result[i] = dateByFormat[toFormat[i]];
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
