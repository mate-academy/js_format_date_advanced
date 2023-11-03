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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const arrayFrom = date.split(separatorFrom);

  const objectFrom = {
    DD: '',
    MM: '',
    YY: '',
    YYYY: '',
  };

  let stringResult = '';

  for (let i = 0; i < (fromFormat.length - 1); i++) {
    switch (fromFormat[i]) {
      case 'DD':
        objectFrom.DD = arrayFrom[i];
        break;

      case 'MM':
        objectFrom.MM = arrayFrom[i];
        break;

      case 'YY':
        objectFrom.YY = arrayFrom[i];
        break;

      case 'YYYY':
        objectFrom.YYYY = arrayFrom[i];
        break;
    }

    if (objectFrom.YY === '') {
      objectFrom.YY = objectFrom.YYYY.slice(2, 4);
    }

    if (objectFrom.YYYY === '') {
      const number = +objectFrom.YY;

      if (number >= 30) {
        objectFrom.YYYY = '19' + objectFrom.YY;
      } else {
        objectFrom.YYYY = '20' + objectFrom.YY;
      }
    }
  }

  for (let i = 0; i < (toFormat.length - 1); i++) {
    switch (toFormat[i]) {
      case 'DD':
        stringResult = stringResult + objectFrom.DD;
        break;

      case 'MM':
        stringResult = stringResult + objectFrom.MM;
        break;

      case 'YY':
        stringResult = stringResult + objectFrom.YY;
        break;

      case 'YYYY':
        stringResult = stringResult + objectFrom.YYYY;
        break;
    }

    if (i < 2) {
      stringResult = stringResult + separatorTo;
    }
  }

  return stringResult;
};

module.exports = formatDate;
