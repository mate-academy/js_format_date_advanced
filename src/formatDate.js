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
  let year;
  let month;
  let day;
  const res = [];
  const separator = fromFormat[3];
  const separator2 = toFormat[3];
  const arr = date.split(separator);

  for (let i = 0; i < arr.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = arr[i];
    }

    if (fromFormat[i] === 'YY') {
      if (arr[i] < 30) {
        year = `${20}` + arr[i];
      }

      if (arr[i] >= 30) {
        year = `${19}` + arr[i];
      }
    }

    if (fromFormat[i] === 'MM') {
      month = arr[i];
    }

    if (fromFormat[i] === 'DD') {
      day = arr[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'YYYY') {
      res.push(year);
    }

    if (toFormat[j] === 'YY') {
      res.push(year[2] + year[3]);
    }

    if (toFormat[j] === 'MM') {
      res.push(month);
    }

    if (toFormat[j] === 'DD') {
      res.push(day);
    }
  }

  return res.join(separator2);
}

module.exports = formatDate;
