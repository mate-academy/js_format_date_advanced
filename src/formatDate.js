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
  const separatorSymbol = fromFormat[3];
  const replacementSymbol = toFormat[3];
  const dateArr = date.split(`${separatorSymbol}`);

  let oldYear = fromFormat.indexOf('YYYY');
  let newYear = toFormat.indexOf('YYYY');
  const oldMonth = fromFormat.indexOf('MM');
  const newMonth = toFormat.indexOf('MM');
  const oldDay = fromFormat.indexOf('DD');
  const newDay = toFormat.indexOf('DD');

  // if the old format is short

  if (oldYear === -1) {
    oldYear = fromFormat.indexOf('YY');

    if (toFormat[newYear].length > 2
      && dateArr[oldYear] >= 30) {
      const str1900 = '19';

      dateArr[oldYear] = str1900.concat(dateArr[oldYear]);
    }

    if (toFormat[newYear].length > 2
      && dateArr[oldYear] < 30
      && dateArr[oldYear] >= 0) {
      const str2000 = '20';

      dateArr[oldYear] = str2000.concat(dateArr[oldYear]);
    }
  }

  // if the new format is short
  if (newYear === -1) {
    newYear = toFormat.indexOf('YY');

    if (fromFormat[oldYear].length === 4) {
      dateArr[oldYear] = dateArr[oldYear].substr(2, 2);
    }
  }

  const newArr = [];

  newArr[newYear] = dateArr[oldYear];
  newArr[newMonth] = dateArr[oldMonth];
  newArr[newDay] = dateArr[oldDay];

  return newArr.join(`${replacementSymbol}`);
}

module.exports = formatDate;
