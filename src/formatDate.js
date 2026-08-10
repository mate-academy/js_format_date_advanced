'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = parts[i];
    }
  }

  if (year.length === 2) {
    const numericYear = Number(year);

    if (numericYear < 30) {
      year = String(2000 + numericYear);
    } else {
      year = String(1900 + numericYear);
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      result.push(day);
    } else if (toFormat[i] === 'MM') {
      result.push(month);
    } else if (toFormat[i] === 'YYYY') {
      result.push(year);
    } else if (toFormat[i] === 'YY') {
      result.push(year.slice(-2));
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
