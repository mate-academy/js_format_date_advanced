/* eslint-disable prettier/prettier */
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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];

  const parts = date.split(separatorFrom);

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < parts.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = parts[i];
    }
  }

  const getFullYear = (yy) => (+yy < 30 ? '20' + yy : '19' + yy);
  const getShortYear = (yyyy) => yyyy.slice(-2);

  if (year.length === 2 && toFormat.includes('YYYY')) {
    year = getFullYear(year);
  } else if (year.length === 4 && toFormat.includes('YY')) {
    year = getShortYear(year);
  }

  const resultParts = toFormat.slice(0, -1).map((token) => {
    if (token === 'DD') {
      return day;
    }

    if (token === 'MM') {
      return month;
    }

    if (token === 'YY' || token === 'YYYY') {
      return year;
    }
  });

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
