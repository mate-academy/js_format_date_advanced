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

  const arrayDate = date.split(fromSeparator);
  const dateObject = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = arrayDate[i];
  }

  if (dateObject.YYYY) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  } else {
    const prefix = Number(dateObject.YY) < 30 ? '20' : '19';

    dateObject.YYYY = prefix + dateObject.YY;
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
