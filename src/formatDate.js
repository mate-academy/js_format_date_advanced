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
  const dateParts = date.split(fromSeparator);

  const dateObject = {};

  for (let i = 0; i < dateParts.length; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if (dateObject.YY) {
    const year = Number(dateObject.YY);

    if (year < 30) {
      dateObject.YYYY = `20${dateObject.YY}`;
    } else {
      dateObject.YYYY = `19${dateObject.YY}`;
    }
  }

  if (dateObject.YYYY) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  }

  const toSeparator = toFormat[toFormat.length - 1];
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
