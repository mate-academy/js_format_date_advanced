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
  const result = [];
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const newDate = date.split(separator);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      year += newDate[i];
    }

    if (fromFormat[i] === 'YY' && +newDate[i] >= 30) {
      year += '19' + newDate[i];
    }

    if (fromFormat[i] === 'YY' && +newDate[i] < 30) {
      year += '20' + newDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month += newDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day += newDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      result.push(day);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'YYYY') {
      result.push(year);
    }

    if (toFormat[i] === 'YY') {
      result.push(year.slice(2));
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
