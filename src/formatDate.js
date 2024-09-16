'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDate[fromFormat[i]] = dateParts[i];
  }

  if (newDate.YYYY) {
    newDate.YY = newDate.YYYY.slice(-2);
  }

  if (newDate.YY < 30) {
    newDate.YYYY = `20${newDate.YY}`;
  } else {
    newDate.YYYY = `19${newDate.YY}`;
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    result += newDate[toFormat[i]];

    if (i < toFormat.length - 2) {
      result += toFormat[toFormat.length - 1];
    }
  }

  return result;
}

module.exports = formatDate;
