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
  const defineYear = () => year < 30
    ? result.push(20 + year)
    : result.push(19 + year);

  const separatorFrom = fromFormat[3];
  const separatorToFormat = toFormat[3];

  const splitedDate = date.split(separatorFrom);

  const result = [];
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splitedDate[i];
      continue;
    }

    if (fromFormat[i] === 'MM') {
      month = splitedDate[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      day = splitedDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && year.length === 4) {
      result.push(year);
      continue;
    }

    if (toFormat[i] === 'YY' && year.length === 4) {
      result.push(year.slice(2));
      continue;
    }

    if (toFormat[i] === 'YYYY' && year.length === 2) {
      defineYear(year);
      continue;
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
      continue;
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(separatorToFormat);
}

module.exports = formatDate;
