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
  const startSeparator = fromFormat[3];
  const endSeparator = toFormat[3];
  const arrDate = date.split(startSeparator);

  const dateObject = {
  };
  const result = [];

  for (let x = 0; x < fromFormat.length; x++) {
    switch (fromFormat[x]) {
      case 'YY':
        dateObject.YY = arrDate[x];
        break;

      case 'YYYY':
        dateObject.YYYY = arrDate[x];
        break;

      case 'DD':
        dateObject.DD = arrDate[x];
        break;

      case 'MM':
        dateObject.MM = arrDate[x];
        break;

      default:
        break;
    }
  }

  for (let x = 0; x < toFormat.length; x++) {
    switch (toFormat[x]) {
      case 'YYYY':
        if (!('YYYY' in dateObject)) {
          reformate(dateObject);
        }
        result.push(dateObject.YYYY);
        break;

      case 'YY':
        if (!('YY' in dateObject)) {
          dateObject.YY = dateObject.YYYY.slice(2);
        }
        result.push(dateObject.YY);
        break;

      case 'DD':
        result.push(dateObject.DD);
        break;

      case 'MM':
        result.push(dateObject.MM);
        break;

      default:
        break;
    }
  }

  return result.join(endSeparator);
}

function reformate(dateObject) {
  if (Number(dateObject.YY) < 30) {
    dateObject.YYYY = `20${dateObject.YY}`;
  } else {
    dateObject.YYYY = `19${dateObject.YY}`;
  }
}

module.exports = formatDate;
