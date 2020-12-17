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
  const parts = date.split(fromFormat[3]);
  const format = [];

  let year;
  let yearFormat;
  let month;
  let day;

  fromFormat.forEach((element, index) => {
    if (element === 'YY' || element === 'YYYY') {
      year = parts[index];
      yearFormat = element;
    }

    if (element === 'MM' || element === 'MMMM') {
      month = parts[index];
    }

    if (element === 'DD' || element === 'DDDD') {
      day = parts[index];
    }
  });

  toFormat.forEach((element, index) => {
    if (element === 'YY' || element === 'YYYY') {
      if (element === 'YYYY' && yearFormat === 'YY') {
        year >= 30 ? year = `19${year}` : year = `20${year}`;
      } else if (element === 'YY' && yearFormat === 'YYYY') {
        year = year.substr(-2);
      }
      format.push(year);
    }

    if (element === 'DD') {
      format.push(day);
    }

    if (element === 'MM') {
      format.push(month);
    }
  });

  return format.join(toFormat[3]);
}

module.exports = formatDate;
