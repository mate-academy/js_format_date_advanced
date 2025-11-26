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
  const result = [];
  const normalizedDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = normalizedDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = normalizedDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day = normalizedDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (year.length === 4 && toFormat[i] === 'YY') {
      result.push(year.slice(-2));
    }

    if (year.length === 2 && toFormat[i] === 'YYYY') {
      year = +year;

      if (year < 30) {
        year += 2000;
        result.push(year.toString());
      } else {
        year += 1900;
        result.push(year.toString());
      }
    }

    if (
      (year.length === 4 && toFormat[i] === 'YYYY') ||
      (year.length === 2 && toFormat[i] === 'YY')
    ) {
      result.push(year);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
