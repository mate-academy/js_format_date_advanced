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
  // write code here
  const searchValue = date;
  const from = fromFormat;
  const to = toFormat;
  const result = [];

  const splitted = searchValue.split(from[3]);

  function yearsInfo(array) {
    const years = {};

    for (const item in array) {
      if (array[item].includes('YY')) {
        years.index = +item; ;
        years.length = array[item].length;
      }
    }

    return years;
  }

  const yearsInfo2 = yearsInfo(from);
  const yearsInfo3 = yearsInfo(to);
  const { index } = yearsInfo2;
  const lengthAfter = yearsInfo3.length;
  const indexhAfter = yearsInfo3.index;

  let finalYears = splitted[index];

  if (lengthAfter === 4 && finalYears.length === 2) {
    if (finalYears > 23) {
      finalYears = 19 + finalYears;
    } else {
      finalYears = 20 + finalYears;
    }
  }

  if (lengthAfter === 2 && finalYears.length === 4) {
    finalYears = finalYears.slice(2);
  }

  result[indexhAfter] = finalYears;
  result[to.indexOf('DD')] = splitted[from.indexOf('DD')];
  result[to.indexOf('MM')] = splitted[from.indexOf('MM')];

  const joined = result.join(to[3]);

  return joined;
}

module.exports = formatDate;
