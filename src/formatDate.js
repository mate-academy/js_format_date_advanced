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
  const delimiterFrom = fromFormat.pop();
  const dateArr = date.split(delimiterFrom);
  const dateObj = {};
  const delimiterTo = toFormat.pop();
  const resultDateArr = [];

  function changeByPattern(yy) {
    if (yy < 30) {
      return '20' + yy;
    };

    return '19' + yy;
  };

  for (let i = 0; i < dateArr.length; i++) {
    const format = fromFormat[i];

    if (fromFormat[i] === 'YYYY') {
      dateObj['YY'] = dateArr[i].substr(-2);
    };

    if (fromFormat[i] === 'YY') {
      dateObj['YYYY'] = changeByPattern(dateArr[i]);
    }

    dateObj[format] = dateArr[i];
  };

  for (let i = 0; i < dateArr.length; i++) {
    const x = toFormat[i];

    resultDateArr[i] = dateObj[x];
  }

  return resultDateArr.join(delimiterTo);
}

module.exports = formatDate;
