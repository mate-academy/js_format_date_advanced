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
  const separatorPos = 3;
  const centuryThreshold = 30;
  const parts = date.split(fromFormat[separatorPos]);
  let year = parts[fromFormat.indexOf('YY')];
  const month = parts[fromFormat.indexOf('MM')];
  const day = parts[fromFormat.indexOf('DD')];

  if (!year) {
    year = parts[fromFormat.indexOf('YYYY')];
  } else if (+year < centuryThreshold) {
    year = '20' + year;
  } else {
    year = '19' + year;
  }

  const result = [];

  for (let i = 0; i < separatorPos; ++i) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(day);

        break;

      case 'MM':
        result.push(month);

        break;

      case 'YY':
        result.push(year.slice(year.length - 'YY'.length));

        break;

      default:
        result.push(year);
    }
  }

  return result.join(toFormat[separatorPos]);
}

module.exports = formatDate;
