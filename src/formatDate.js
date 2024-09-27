'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(fromFormat[3]);
  let day = '';
  let month = '';
  let year = '';
  const newFormat = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('Y')) {
      year = arrayDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = arrayDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = arrayDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].includes('M')) {
      newFormat[i] = month;
    }

    if (toFormat[i] === 'YY') {
      newFormat[i] = year.slice(-2);
    }

    if (toFormat[i] === 'YYYY' && +year < 100) {
      if (+year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }

    if (toFormat[i] === 'YYYY') {
      newFormat[i] = year;
    }

    if (toFormat[i].includes('D')) {
      newFormat[i] = day;
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
