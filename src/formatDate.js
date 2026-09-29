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

  const dateData = {};

  for (let i = 0; i < 3; i++) {
    dateData[fromFormat[i]] = dateParts[i];
  }

  if (dateData.YY) {
    const year = Number(dateData.YY);

    dateData.YYYY = year < 30 ? `20${dateData.YY}` : `19${dateData.YY}`;
  }

  if (dateData.YYYY) {
    dateData.YY = dateData.YYYY.slice(-2);
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(dateData[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
