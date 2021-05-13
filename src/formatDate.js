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

function formatDate(date, fromDate, toFormat) {
  const result = [];
  const dateSplit = date.split(fromDate[3]);
  const indexOfYearTill = (fromDate.indexOf('YY') !== -1)
    ? fromDate.indexOf('YY')
    : fromDate.indexOf('YYYY');

  const indexOfYearAfter = (toFormat.indexOf('YY') !== -1)
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  let year = +dateSplit[indexOfYearTill];

  if (fromDate[indexOfYearTill] === 'YY'
    && toFormat[indexOfYearAfter] === 'YYYY') {
    year = +dateSplit[indexOfYearTill];

    if (year >= 30) {
      year = (year === 0) ? '00' : year;
      year = `19${year}`;
    } else {
      year = (year === 0) ? '00' : year;
      year = `20${year}`;
    }
  }

  if (fromDate[indexOfYearTill] === 'YYYY'
    && toFormat[indexOfYearAfter] === 'YY') {
    year = dateSplit[indexOfYearTill];
    year = year[2] + year[3];
    year = +year;

    if (year > 30) {
      year = `${year}`;
    } else {
      year = `${year}`;
    }
  }

  result[toFormat.indexOf('DD')] = (dateSplit[fromDate.indexOf('DD')]);
  result[toFormat.indexOf('MM')] = (dateSplit[fromDate.indexOf('MM')]);

  result[indexOfYearAfter] = year;

  return result.join(toFormat[3]);
}

module.exports = formatDate;
