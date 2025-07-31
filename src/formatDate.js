'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const isBigFormat = toFormat.includes('YYYY');
  const dateArr = date.split(oldSeparator);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateArr[i];
    }
  }

  if (isBigFormat !== fromFormat.includes('YYYY')) {
    year = year.slice(-2);
  }

  if (fromFormat.includes('YY') && isBigFormat) {
    year = +year < 30 ? '20' + year : '19' + year; // YY → YYYY
  }

  const result = toFormat.slice(0, 3).map((part) => {
    if (part === 'MM') {
      return month;
    }

    if (part === 'DD') {
      return day;
    }

    return year;
  });

  return result.join(newSeparator);
}

module.exports = formatDate;
