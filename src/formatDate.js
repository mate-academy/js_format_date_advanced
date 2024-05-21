'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  let year;
  let month;
  let day;
  const resArr = [];

  for (let i = 0; i < 3; i++) {
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

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year.length === 4) {
        resArr[i] = year;
      } else {
        resArr[i] = year < 30 ? +('20' + year) : +('19' + year);
      }
    }

    if (toFormat[i] === 'YY') {
      if (year.length === 2) {
        resArr[i] = year;
      } else {
        resArr[i] = year.slice(2);
      }
    }

    if (toFormat[i] === 'MM') {
      resArr[i] = month;
    }

    if (toFormat[i] === 'DD') {
      resArr[i] = day;
    }
  }

  return resArr.join(toFormat[3]);
}

module.exports = formatDate;
