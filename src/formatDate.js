'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const signFrom = fromFormat[3];
  const signTo = toFormat[3];
  const splitDate = date.split(signFrom);
  let day = '';
  let month = '';
  let year = '';
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = splitDate[i];
    }

    if (fromFormat[i] === 'YY') {
      year = splitDate[i];

      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = month;
    }

    if (toFormat[i] === 'YYYY') {
      newDate[i] = year;
    }

    if (toFormat[i] === 'YY') {
      newDate[i] = year.slice(-2);
    }
  }

  return newDate.join(signTo);
}

module.exports = formatDate;
