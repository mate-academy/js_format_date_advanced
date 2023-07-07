'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldDelimiter = fromFormat[fromFormat.length - 1];
  const newDelimiter = toFormat[toFormat.length - 1];
  const reformattedDate = [];

  const dateParts = date.split(oldDelimiter);

  const dateInfo = {
    day: 0,
    month: 0,
    year: 0,
  };

  for (let i = 0; i < dateParts.length; i++) {
    switch (true) {
      case fromFormat[i] === 'DD':
        dateInfo.day = dateParts[i];
        break;

      case fromFormat[i] === 'MM':
        dateInfo.month = dateParts[i];
        break;

      case fromFormat[i] === 'YY' && dateParts[i] < 30:
        dateInfo.year = `${20 + dateParts[i]}`;
        break;

      case fromFormat[i] === 'YY' && dateParts[i] >= 30:
        dateInfo.year = `${19 + dateParts[i]}`;
        break;

      case fromFormat[i] === 'YYYY':
        dateInfo.year = dateParts[i];
        break;
    }
  }

  for (let i = 0; i < dateParts.length; i++) {
    switch (true) {
      case toFormat[i] === 'DD':
        reformattedDate.push(dateInfo.day);
        break;

      case toFormat[i] === 'MM':
        reformattedDate.push(dateInfo.month);
        break;

      case toFormat[i] === 'YY':
        reformattedDate.push(dateInfo.year.slice(2, 4));
        break;

      case toFormat[i] === 'YYYY':
        reformattedDate.push(dateInfo.year);
        break;
    }
  }

  return reformattedDate.join(newDelimiter);
}

module.exports = formatDate;
