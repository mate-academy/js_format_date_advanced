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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const currentDate = date.split(fromSeparator);
  const day = currentDate[fromFormat.findIndex(el => el === 'DD')];
  const month = currentDate[fromFormat.findIndex(el => el === 'MM')];
  const year = currentDate[fromFormat.findIndex(el => el[0] === 'Y')];
  const fromYear = fromFormat.find(el => el[0] === 'Y');
  const toYear = toFormat.find(el => el[0] === 'Y');
  let newDate;
  let newYear = year;

  if (fromYear.length > toYear.length) {
    newYear = year.slice(2);
  }

  if (fromYear.length < toYear.length) {
    if (year < 30) {
      newYear = '20' + year;
    } else {
      newYear = '19' + year;
    }
  }

  if (toFormat[0] === 'DD') {
    newDate = [day, month, newYear];
  }

  if (toFormat[1] === 'DD') {
    newDate = [month, day, newYear];
  }

  if (toFormat[2] === 'DD') {
    newDate = [newYear, month, day];
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
