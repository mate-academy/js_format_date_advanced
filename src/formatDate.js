'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateValue = date.split(fromFormat[3]);
  const newDate = [];

  let day = '';
  let year = '';
  let month = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateValue[i];
    } else if (fromFormat[i] === 'YYYY') {
      year = dateValue[i];
    } else if (fromFormat[i] === 'YY') {
      if (parseInt(dateValue[i]) < 30) {
        year = '20' + dateValue[i];
      } else {
        year = '19' + dateValue[i];
      }
    } else if (fromFormat[i] === 'MM') {
      month = dateValue[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate.push(day);
    } else if (toFormat[i] === 'YYYY') {
      newDate.push(year);
    } else if (toFormat[i] === 'YY') {
      newDate.push(year.slice(-2));
    } else if (toFormat[i] === 'MM') {
      newDate.push(month);
    }
  }

  return newDate.join(toFormat[3]);
}
module.exports = formatDate;
