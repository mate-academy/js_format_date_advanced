'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];
  const oldFormat = {};
  const dateLength = 3;
  let year;

  for (let i = 0; i < dateLength; i++) {
    oldFormat[fromFormat[i]] = oldDate[i];
  }

  if (oldFormat.YYYY) {
    year = oldFormat.YYYY;
  } else {
    year = oldFormat.YY;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = oldFormat.YYYY.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year >= 30) {
      year = 19 + year;
    } else {
      year = 20 + year;
    }
  }

  for (let i = 0; i < dateLength; i++) {
    if (toFormat.indexOf('DD') === i) {
      newDate.push(oldFormat.DD);
    }

    if (toFormat.indexOf('MM') === i) {
      newDate.push(oldFormat.MM);
    }

    if (toFormat.indexOf('YY') === i) {
      newDate.push(year);
    } else if (toFormat.indexOf('YYYY') === i) {
      newDate.push(year);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
