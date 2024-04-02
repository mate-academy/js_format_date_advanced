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
  const SEPARATOR = fromFormat[fromFormat.length - 1];
  const JOINER = toFormat[toFormat.length - 1];
  const DATEPARTS = date.split(SEPARATOR);

  while (DATEPARTS.length > 1 && DATEPARTS[DATEPARTS.length - 1] === '') {
    DATEPARTS.pop();
  }

  const DATEMAP = {};

  fromFormat.forEach((part, index) => {
    DATEMAP[part] = DATEPARTS[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    DATEMAP['YY'] = DATEMAP['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const FULLYEAR
    = parseInt(DATEMAP['YY']) < 30
      ? '20' + DATEMAP['YY']
      : '19' + DATEMAP['YY'];

    DATEMAP['YYYY'] = FULLYEAR;
  }

  const FORMATTEDDATE = toFormat.map((part) => DATEMAP[part]);

  return FORMATTEDDATE.slice(0, -1).join(JOINER);
}

module.exports = formatDate;
