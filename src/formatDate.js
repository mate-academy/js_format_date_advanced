'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let month = '';
  let day = '';
  let separator = '';

  for (const char of date) {
    if (char < '0' || char > '9') {
      separator = char;
      break;
    }
  }

  let newDate = '';
  let newSeparator = '';

  for (const n of toFormat) {
    if (n !== 'YYYY' && n !== 'YY' && n !== 'MM' && n !== 'DD') {
      newSeparator = n;
    }
  }

  const dateArray = date.split(separator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateArray[i];
    } else if (fromFormat[i] === 'YY') {
      if (Number(dateArray[i]) < 30) {
        year = `20${dateArray[i]}`;
      } else {
        year = `19${dateArray[i]}`;
      }
    } else if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    } else if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate += year;
    } else if (toFormat[i] === 'YY') {
      newDate += year.slice(2);
    } else if (toFormat[i] === 'MM') {
      newDate += month;
    } else if (toFormat[i] === 'DD') {
      newDate += day;
    }

    if (i < toFormat.length - 2) {
      newDate += newSeparator;
    }
  }

  return newDate;
}

module.exports = formatDate;
