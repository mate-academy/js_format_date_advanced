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
  const result = [];
  const sepFrom = fromFormat[3];
  const sepTo = toFormat[3];
  const arrDate = date.split(sepFrom);
  const indexFrom = checkPosDate(fromFormat);
  const indexTo = checkPosDate(toFormat);
  const newYear = toFormat[indexTo.year];
  const oldYear = fromFormat[indexFrom.year];

  if (newYear === oldYear) {
    result[indexTo.year] = arrDate[indexFrom.year];
  } else if (oldYear.length > newYear.length) {
    result[indexTo.year] = arrDate[indexFrom.year].slice(2);
  } else {
    if (arrDate[indexFrom.year] < 30) {
      result[indexTo.year] = 20 + arrDate[indexFrom.year];
    } else {
      result[indexTo.year] = 19 + arrDate[indexFrom.year];
    }
  }

  result[indexTo.day] = arrDate[indexFrom.day];
  result[indexTo.month] = arrDate[indexFrom.month];

  return result.join(sepTo);
}

function checkPosDate(format) {
  let d = 0;
  let m = 0;
  let y = 0;

  for (let i = 0; i < format.length; i++) {
    if (format[i].includes('D')) {
      d = i;
    }

    if (format[i].includes('M')) {
      m = i;
    }

    if (format[i].includes('Y')) {
      y = i;
    }
  }

  return {
    'day': d,
    'month': m,
    'year': y,
  };
}

module.exports = formatDate;
