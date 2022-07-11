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
  const formatedDate = [];
  const separator = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const splitedDate = date.split(separator);
  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  let yearIndex = 0;

  if (fromFormat.includes('YYYY')) {
    yearIndex = fromFormat.indexOf('YYYY');
  } else if (fromFormat.includes('YY')) {
    yearIndex = fromFormat.indexOf('YY');
  }

  let year = splitedDate[yearIndex];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      formatedDate.push(splitedDate[dayIndex]);
    }

    if (toFormat[i] === 'MM') {
      formatedDate.push(splitedDate[monthIndex]);
    }

    if (toFormat[i] === 'YYYY') {
      if (fromFormat.includes('YY')) {
        if (year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      }

      formatedDate.push(year);
    }

    if (toFormat[i] === 'YY') {
      if (fromFormat.includes('YYYY')) {
        year = year.slice(2);
      }
      formatedDate.push(year);
    }
  }

  return formatedDate.join(separatorTo);
}

module.exports = formatDate;
