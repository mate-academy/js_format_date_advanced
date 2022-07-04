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
  const firstSeperator = fromFormat.pop();
  const secondSeperator = toFormat.pop();

  const separatedDate = date.split(`${firstSeperator}`);

  const values = {};

  separatedDate.forEach((el, index) => {
    values[fromFormat[index]] = el;
  });

  if (values.hasOwnProperty('YYYY')) {
    values.YY = values.YYYY.slice(2);
  } else {
    values.YYYY = (+values.YY < 30 && values.YY >= 0)
      ? `20${values.YY}`
      : `19${values.YY}`;
  }

  const formated = [];

  toFormat.forEach(el => {
    switch (el) {
      case 'DD':
        formated.push(values.DD);
        break;

      case 'MM':
        formated.push(values.MM);
        break;

      case 'YY':
        formated.push(values.YY);
        break;

      case 'YYYY':
        formated.push(values.YYYY);
        break;
    }
  });

  fromFormat.push(firstSeperator);
  toFormat.push(secondSeperator);

  return formated.join(`${secondSeperator}`);
}

module.exports = formatDate;
