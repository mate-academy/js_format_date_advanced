'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  let year = '';
  let month = '';
  let day = '';
  let string = '';
  let newDate = '';
  const sign = toFormat[toFormat.length - 1];
  const dateParts = date.split(/[.\-/]/);

  for (let i = 0; i < fromFormat.length; i++) {
    const meaning = fromFormat[i];

    if (meaning === 'YYYY') {
      year += dateParts[i];
    }

    if (meaning === 'YY') {
      year = parseInt(dateParts[i]);

      if (year > 0 && year < 30) {
        year = '20' + year;
      } else if (year === 0) {
        year = '200' + year;
      } else {
        year = '19' + year;
      }
    }

    if (meaning === 'MM') {
      month += dateParts[i];
    }

    if (meaning === 'DD') {
      day += dateParts[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    const value = toFormat[j];

    if (value === 'YYYY') {
      string += year + ' ';
    }

    if (value === 'YY') {
      string += year.slice(-2) + ' ';
    }

    if (value === 'MM') {
      string += month + ' ';
    }

    if (value === 'DD') {
      string += day + ' ';
    }
  }

  newDate = string.split(' ').join(sign).slice(0, -1);

  return newDate;
}

module.exports = formatDate;
