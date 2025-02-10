'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [point, , , year] = [...fromFormat].sort();
  const [toPoint, , , toYear] = [...toFormat].sort();

  const indexYear = formatYear(fromFormat);
  const toIndexYear = formatYear(toFormat);

  const splitDate = date.split(point);
  const newDate = [];

  newDate[toFormat.indexOf('DD')] = splitDate[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = splitDate[fromFormat.indexOf('MM')];
  newDate[toIndexYear] = splitDate[indexYear];

  if (toYear.length === 2 && year.length === 4) {
    newDate[toIndexYear] = splitDate[indexYear].split('').slice(2).join('');
  }

  if (toYear.length === 4 && year.length === 2) {
    if (splitDate[indexYear] < 21) {
      newDate[toIndexYear] = 2000 + +splitDate[indexYear];
    } else {
      newDate[toIndexYear] = 1900 + +splitDate[indexYear];
    }
  }

  function formatYear(checkFormat) {
    if (checkFormat.includes('YYYY')) {
      return checkFormat.indexOf('YYYY');
    }

    if (checkFormat.includes('YY')) {
      return checkFormat.indexOf('YY');
    }
  }

  return newDate.join(toPoint);
}

module.exports = formatDate;
