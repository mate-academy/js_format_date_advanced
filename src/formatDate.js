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
  const dateElements = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const resultingDate = [];
  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        dateObject['YY'] = dateElements[i];
        break;

      case 'YYYY':
        dateObject['YYYY'] = dateElements[i];
        break;

      case 'MM':
        dateObject['MM'] = dateElements[i];
        break;

      case 'DD':
        dateObject['DD'] = dateElements[i];
        break;
    }
  }

  normalizeYear();

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultingDate.push(dateObject[toFormat[i]]);
  }

  return resultingDate.join(separator);

  function normalizeYear() {
    const yearFrom = fromFormat.find(item => item.includes('Y'));
    const yearTo = toFormat.find(item => item.includes('Y'));

    if (yearTo.length < yearFrom.length) {
      dateObject[yearTo] = dateObject[yearFrom].slice(2);
      delete dateObject[yearFrom];
    }

    if (yearTo.length > yearFrom.length) {
      dateObject[yearTo]
        = dateObject[yearFrom] < 30
          ? `20${dateObject[yearFrom]}`
          : `19${dateObject[yearFrom]}`;

      delete dateObject[yearFrom];
    }
  }
}

module.exports = formatDate;
