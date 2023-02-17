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
  const resultedDate = [];
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const separatedDate = date.split((separatorFrom));
  let currentYear = separatedDate[fromFormat.indexOf('YY')]
    || separatedDate[fromFormat.indexOf('YYYY')];

  resultedDate[toFormat.indexOf('MM')]
    = separatedDate[fromFormat.indexOf('MM')];

  resultedDate[toFormat.indexOf('DD')]
    = separatedDate[fromFormat.indexOf('DD')];

  if (toFormat.includes('YYYY')) {
    if (fromFormat.includes('YY')) {
      currentYear = currentYear < 30 ? `20${currentYear}` : `19${currentYear}`;
    }
    resultedDate[toFormat.indexOf('YYYY')] = currentYear;
  }

  if (toFormat.includes('YY')) {
    if (fromFormat.includes('YYYY')) {
      currentYear = currentYear.slice(-2);
    }
    resultedDate[toFormat.indexOf('YY')] = currentYear;
  }

  return resultedDate.join(separatorTo);
}

module.exports = formatDate;
