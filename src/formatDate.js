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
  const initialSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const normalizedDate = date.split(initialSeparator);
  const newFormat = toFormat;

  const dateObject = {
    'DD': 0,
    'MM': 0,
    'YY': 0,
    'YYYY': 0,
  };

  for (let item = 0; item < 3; item++) {
    dateObject[fromFormat[item]] = normalizedDate[item];
  }

  dateObject['YY'] = dateObject['YY'] === 0
    ? dateObject['YYYY'].slice(-2) : dateObject['YY'];

  const longDate = (dateObject['YY'] >= 30 ? '19' : '20') + dateObject['YY'];

  dateObject['YYYY'] = dateObject['YYYY'] === 0
    ? longDate : dateObject['YYYY'];

  return newFormat.map(x => dateObject[x]).join(newSeparator);
}

module.exports = formatDate;
