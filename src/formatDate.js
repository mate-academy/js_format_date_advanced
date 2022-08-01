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
 * @param {string} dateArray
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);

  const dateObj = {
    DD: '',
    MM: '',
    YY: '',
    YYYY: '',
  };

  let result = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dateObj.DD = dateArray[i];
        break;

      case 'MM':
        dateObj.MM = dateArray[i];
        break;

      case 'YY':
        dateObj.YY = dateArray[i];
        break;

      case 'YYYY':
        dateObj.YYYY = dateArray[i];
        break;

      default:
        break;
    }
  }

  if (fromFormat.includes('YYYY') === true
      && toFormat.includes('YY') === true) {
    dateObj.YY = dateObj.YYYY.slice(2);
  } else if (fromFormat.includes('YY') === true
      && toFormat.includes('YYYY') === true) {
    if (dateObj.YY >= 30) {
      dateObj.YYYY = `19${dateObj.YY}`;
    } else {
      dateObj.YYYY = `20${dateObj.YY}`;
    }
  }

  for (let x = 0; x < toFormat.length; x++) {
    if (x < 2) {
      result += dateObj[toFormat[x]] + toFormat[3];
    } else {
      result += dateObj[toFormat[x]];
      break;
    }
  }

  return result;
}

module.exports = formatDate;
