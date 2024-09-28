'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateStr = date.split(fromFormat[3]);
  const fullYear = 'YYYY';
  const shortYear = 'YY';
  const dateObj = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateStr[i];
  }

  if (dateObj[fullYear]) {
    dateObj[shortYear] = dateObj[fullYear].slice(-2);
  }

  if (dateObj[shortYear] < 30) {
    dateObj[fullYear] = 20 + dateObj[shortYear];
  } else {
    dateObj[fullYear] = 19 + dateObj[shortYear];
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(dateObj[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
