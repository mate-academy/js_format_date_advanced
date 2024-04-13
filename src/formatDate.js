'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = parts[i];
    } else if (fromFormat[i] === 'YY') {
      year = (parseInt(parts[i]) < 30 ? '20' : '19') + parts[i];
    } else if (fromFormat[i] === 'MM') {
      month = parts[i];
    } else if (fromFormat[i] === 'DD') {
      day = parts[i];
    }
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate += year;
    } else if (toFormat[i] === 'YY') {
      newDate += year.slice(-2);
    } else if (toFormat[i] === 'MM') {
      newDate += month;
    } else if (toFormat[i] === 'DD') {
      newDate += day;
    }
    newDate += toFormat[toFormat.length - 1];
  }

  return newDate.slice(0, -1);
}

module.exports = formatDate;
