'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const day = dateParts[fromFormat.indexOf('DD')];
  const month = dateParts[fromFormat.indexOf('MM')];
  let year = dateParts[fromFormat.indexOf('YYYY')];

  if (fromFormat.indexOf('YYYY') === -1) {
    year = dateParts[fromFormat.indexOf('YY')];
  }

  let newFormat = [];

  newFormat[toFormat.indexOf('DD')] = day;
  newFormat[toFormat.indexOf('MM')] = month;

  if (toFormat.indexOf('YYYY') === -1 && year.length === 4) {
    year = year.slice(2);
  }

  if (toFormat.indexOf('YY') === -1 && year.length === 2) {
    year = +year < 30 ? '20' + year : '19' + year;
  }

  if (year.length === 4) {
    newFormat[toFormat.indexOf('YYYY')] = year;
  } else {
    newFormat[toFormat.indexOf('YY')] = year;
  }

  newFormat = newFormat.join(toFormat[toFormat.length - 1]);

  return newFormat;
}

module.exports = formatDate;
