'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newData = date.split(fromFormat[3]);
  let year;
  let month;
  let day;

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = newData[i];
    }

    if (fromFormat[i] === 'MM') {
      month = newData[i];
    }

    if (fromFormat[i] === 'DD') {
      day = newData[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && year.length > 2) {
      newData[i] = year;
    }

    if (toFormat[i] === 'YYYY' && year.length < 4) {
      if (year >= 30) {
        year = '19' + year;
      } else {
        year = '20' + year;
      }
      newData[i] = year;
    }

    if (toFormat[i] === 'YY' && year.length > 2) {
      newData[i] = year.slice(2, 4);
    }

    if (toFormat[i] === 'MM') {
      newData[i] = month;
    }

    if (toFormat[i] === 'DD') {
      newData[i] = day;
    }
  }

  return newData.join(toFormat[3]);
}

module.exports = formatDate;
