'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = parts[i];
    } else if (fromFormat[i] === 'MM') {
      month = parts[i];
    } else if (fromFormat[i] === 'DD') {
      day = parts[i];
    }
  }

  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(-2);
  } else if (toFormat.includes('YYYY') && year.length === 2) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newDate += year;
    } else if (toFormat[i] === 'MM') {
      newDate += month;
    } else if (toFormat[i] === 'DD') {
      newDate += day;
    }
    newDate += toFormat[toFormat.length - 1];
  }
  newDate = newDate.slice(0, -1);

  return newDate;
}

module.exports = formatDate;
