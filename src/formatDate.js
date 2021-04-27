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
  const dateObj = {};
  let str = '';

  const dateArr = date.split(fromFormat[3]);

  dateArr.forEach((el, index) => {
    dateObj[fromFormat[index]] = el;
  });

  toFormat.forEach((el, index) => {
    let addValue = dateObj[el];

    if (el === 'YYYY' && dateObj['YY']) {
      let yearStart;

      if (dateObj['YY'] < 30) {
        yearStart = '20';
      } else {
        yearStart = '19';
      };

      addValue = yearStart + dateObj['YY'];
    };

    if (el === 'YY' && dateObj['YYYY']) {
      addValue = dateObj['YYYY'].slice(2);
    };

    if (index < toFormat.length - 1) {
      str += addValue;

      if (index < toFormat.length - 2) {
        str += toFormat[3];
      };
    };
  });

  return str;
};

module.exports = formatDate;
