'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const currentDate = date.split(fromFormat[fromFormat.length - 1]);
  const formatedDate = {};

  let yearFrom = '';
  let yearTo = '';
  let result = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].indexOf('Y') !== -1) {
      yearFrom = fromFormat[i];
    }

    formatedDate[fromFormat[i]] = currentDate[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].toLocaleLowerCase() !== toFormat[i].toLocaleUpperCase()) {
      if (toFormat[i].indexOf('Y') !== -1) {
        yearTo = toFormat[i];

        result += formatYear(formatedDate[yearFrom], yearFrom, yearTo) + ' ';
      } else {
        result += formatedDate[toFormat[i]] + ' ';
      }
    } else {
      result = result.trim().replaceAll(' ', toFormat[i]);
    }
  }

  return String(result);
}

function formatYear(year, yearFrom = '', yearTo = '') {
  if (yearFrom === 'YYYY' && yearTo === 'YY') {
    return year.slice(-2);
  }

  if (yearFrom === 'YY' && yearTo === 'YYYY') {
    if (year < 30) {
      return '20' + year;
    } else {
      return '19' + year;
    }
  }

  return year;
}

module.exports = formatDate;
