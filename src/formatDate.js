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
  const dateArr = date.split(fromFormat[3]);
  let year = '';
  let month = '';
  let day = '';

  for (const element of fromFormat) {
    if (element === 'YY' || element === 'YYYY') {
      year += dateArr[fromFormat.indexOf(element)];
    }

    if (element === 'MM') {
      month += dateArr[fromFormat.indexOf(element)];
    }

    if (element === 'DD') {
      day += dateArr[fromFormat.indexOf(element)];
    }
  }

  if (toFormat.includes('YYYY') && year.length < 4) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (toFormat.includes('YY') && year.length > 2) {
    year = year.split('').slice(2).join('');
  }

  const dateFormated = [];

  for (const element of toFormat) {
    if (element === 'YY' || element === 'YYYY') {
      dateFormated.push(year);
    }

    if (element === 'DD') {
      dateFormated.push(day);
    }

    if (element === 'MM') {
      dateFormated.push(month);
    }
  }

  return dateFormated.join(toFormat[3]);
}

module.exports = formatDate;
