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
  const newDate = date;
  let str = '';

  if ((fromFormat[0] === 'YYYY') && (fromFormat[2] === 'DD')
   && (toFormat[0] === 'YYYY') && (toFormat[2] === 'DD')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);
  }

  if ((fromFormat[0] === 'YYYY') && (fromFormat[2] === 'DD')
   && (toFormat[0] === 'YY') && (toFormat[2] === 'DD')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);
    str = str.slice(2);
  }

  if ((fromFormat[0] === 'DD') && (fromFormat[2] === 'YYYY')
   && (toFormat[0] === 'DD') && (toFormat[2] === 'YY')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);
    str = str.slice(0, str.length - 3);
  }

  if ((fromFormat[0] === 'YY') && (fromFormat[2] === 'DD')
  && (toFormat[0] === 'YYYY') && (toFormat[2] === 'DD')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);

    if ((Number(str.slice(0, 2)) < 29) && (Number(str.slice(0, 2)) >= 0)) {
      str = '20' + str;
    } else {
      str = '19' + str;
    }
  }

  if ((fromFormat[0] === 'MM') && (fromFormat[2] === 'YYYY')
  && (toFormat[0] === 'MM') && (toFormat[2] === 'YY')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);
    str = newDate.slice(0, 6) + newDate.slice(8);
  }

  if ((fromFormat[0] === 'YYYY') && (fromFormat[2] === 'DD')
   && (toFormat[0] === 'DD') && (toFormat[2] === 'YYYY')) {
    str = newDate.replace(fromFormat[3], toFormat[3]);
    str = str.replace(fromFormat[3], toFormat[3]);
    str = newDate.slice(8) + newDate.slice(4, 8) + newDate.slice(0, 4);
  }

  if (str === '') {
    if (fromFormat[0] === 'MM') {
      str = newDate.slice(8) + toFormat[3] + newDate.slice(0, 7);
    }
  }

  return str;
}

module.exports = formatDate;
