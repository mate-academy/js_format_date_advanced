'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepOld = fromFormat[3];
  const sepNew = toFormat[3];
  const dateArr = date.split(sepOld);
  let year = 0;
  let month = 0;
  let day = 0;
  const newDate = [];

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }
  }

  for (let i = 0; i <= 2; i++) {
    if (toFormat[i] === 'YYYY' && year.length === 4) {
      newDate[i] = year;
    }

    if (toFormat[i] === 'YY' && year.length === 4) {
      newDate[i] = year.toString().slice(2);
    }

    if (toFormat[i] === 'YYYY' && year.length === 2) {
      if (year < 30) {
        newDate[i] = ['20', year].join('');
      } else {
        newDate[i] = ['19', year].join('');
      }
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = month;
    }

    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    }
  }

  return newDate.join(sepNew);
}

module.exports = formatDate;
