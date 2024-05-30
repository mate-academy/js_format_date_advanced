'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';

  let symbol = '';

  for (let i = 0; i < date.length; i++) {
    if (isNaN(date[i])) {
      symbol = date[i];
    }
  }

  const slicedDate = date.split(symbol);

  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  const indexOfYear = findindexOfYear(fromFormat, slicedDate);

  const day = slicedDate[indexOfDay];
  const month = slicedDate[indexOfMonth];
  let year = slicedDate[indexOfYear];

  const toIndexOfDay = toFormat.indexOf('DD');
  const toIndexOfMonth = toFormat.indexOf('MM');
  const toIndexOfYear = toFindindexOfYear(toFormat);

  if (year.length === 2) {
    if (+year < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }

  if (toFormat[toIndexOfYear] === 'YY' && year.length === 4) {
    year = year.slice(2, 4);
  }

  for (let i = 0; i < 3; i++) {
    if (toIndexOfDay === i) {
      result += day;
    }

    if (toIndexOfMonth === i) {
      result += month;
    }

    if (toIndexOfYear === i) {
      result += year;
    }

    if (i < 2) {
      result += toFormat[3];
    }
  }

  return result;
}

function findindexOfYear(format, date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i].length === 4) {
      const indexOfYearLong = format.indexOf('YYYY');

      return indexOfYearLong;
    }
  }

  const indexOfYear = format.indexOf('YY');

  return indexOfYear;
}

function toFindindexOfYear(toFormat) {
  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].length === 4) {
      const indexOfYearLong = toFormat.indexOf('YYYY');

      return indexOfYearLong;
    }
  }

  const indexOfYear = toFormat.indexOf('YY');

  return indexOfYear;
}

module.exports = formatDate;
