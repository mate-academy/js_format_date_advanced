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
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  const ddIndexFrom = fromFormat.indexOf('DD');
  const ddIndexTo = toFormat.indexOf('DD');

  newDate[ddIndexTo] = oldDate[ddIndexFrom];

  const mmIndexFrom = fromFormat.indexOf('MM');
  const mmIndexTo = toFormat.indexOf('MM');

  newDate[mmIndexTo] = oldDate[mmIndexFrom];

  let yyIndexFrom;
  let yyIndexTo;

  switch (true) {
    case fromFormat.includes('YYYY') && toFormat.includes('YYYY'):
      yyIndexFrom = fromFormat.indexOf('YYYY');
      yyIndexTo = toFormat.indexOf('YYYY');

      newDate[yyIndexTo] = oldDate[yyIndexFrom];
      break;

    case fromFormat.includes('YY') && toFormat.includes('YYYY'):
      yyIndexFrom = fromFormat.indexOf('YY');
      yyIndexTo = toFormat.indexOf('YYYY');

      if (+oldDate[yyIndexFrom] < 30) {
        newDate[yyIndexTo] = '20' + oldDate[yyIndexFrom];
      } else {
        newDate[yyIndexTo] = '19' + oldDate[yyIndexFrom];
      }
      break;

    case fromFormat.includes('YYYY') && toFormat.includes('YY'):
      yyIndexFrom = fromFormat.indexOf('YYYY');
      yyIndexTo = toFormat.indexOf('YY');

      newDate[yyIndexTo] = oldDate[yyIndexFrom].slice(-2);
      break;
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
