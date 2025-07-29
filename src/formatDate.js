'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let day;
  let month;
  let year;
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const oldDate = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = oldDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = oldDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = oldDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      toFormat[i] = day;
    }

    if (toFormat[i] === 'MM') {
      toFormat[i] = month;
    }

    if (
      (toFormat[i] === 'YY' && year.length === 2) ||
      (toFormat[i] === 'YYYY' && year.length === 4)
    ) {
      toFormat[i] = year;
    }

    if (toFormat[i] === 'YY' && year.length === 4) {
      toFormat[i] = year.slice(2);
    }

    if (toFormat[i] === 'YYYY' && year.length === 2 && year < 30) {
      toFormat[i] = '20' + year;
    }

    if (toFormat[i] === 'YYYY' && year.length === 2 && year >= 30) {
      toFormat[i] = '19' + year;
    }
  }
  toFormat.length = 3;

  return toFormat.join(newSeparator);
}

module.exports = formatDate;
