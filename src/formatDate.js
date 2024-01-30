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

const MONTH_SCHEMA = 'YY';
const YEAR_SCHEMA = 'YYYY';
const CENTURY_THRESHOLD = 30;
const CENTURY_PREFIX_21 = 20;
const CENTURY_PREFIX_20 = 19;

function formatDate(date, fromFormat, toFormat) {
  const parsedDate = {};
  const formattedDate = [];
  const delimiterFromFormat = fromFormat[3];
  const delimiterToFormat = toFormat[3];
  const splittedDate = date.split(delimiterFromFormat);

  splittedDate.forEach((item, i) => {
    parsedDate[fromFormat[i]] = item;
  });

  const keysDate = Object.keys(parsedDate);

  toFormat.forEach((item, i) => {
    if (item === MONTH_SCHEMA && !keysDate.includes(item)) {
      formattedDate.push((parsedDate[YEAR_SCHEMA]).slice(2));
    }

    if (item === YEAR_SCHEMA && !keysDate.includes(item)) {
      const year = `${parsedDate[MONTH_SCHEMA] < CENTURY_THRESHOLD
        ? CENTURY_PREFIX_21
        : CENTURY_PREFIX_20}${parsedDate[MONTH_SCHEMA]}`;

      formattedDate.push(year);
    }

    if (keysDate.includes(item)) {
      formattedDate.push(parsedDate[item]);
    }
  });

  return formattedDate.join(delimiterToFormat);
}

module.exports = formatDate;
