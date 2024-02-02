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
  let resultDate = '';
  const objectDateFormat = {};
  const splitter = fromFormat[fromFormat.length - 1];
  const dateSplitted = date.split(splitter);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const currentCentury = dateSplitted[i] < 30;
    const pastCentury = dateSplitted[i] >= 30;
    const formatCondition = fromFormat[i] === 'YY' && toFormat.includes('YYYY');

    if (formatCondition && currentCentury) {
      objectDateFormat.YYYY = '20' + dateSplitted[i];
    } else if (formatCondition && pastCentury) {
      objectDateFormat.YYYY = '19' + dateSplitted[i];
    } else if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      objectDateFormat.YY = dateSplitted[i].slice(2);
    } else {
      objectDateFormat[fromFormat[i]] = dateSplitted[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i > 0) {
      resultDate += toFormat[toFormat.length - 1];
    }

    resultDate += objectDateFormat[toFormat[i]];
  }

  return resultDate;
}

module.exports = formatDate;
