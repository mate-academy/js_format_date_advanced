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
  let day = 0;
  let month = 0;
  let year = 0;
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const arrayFromDate = date.split(separator);
  const newDateArray = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = arrayFromDate[i];
    };

    if (fromFormat[i] === 'MM') {
      month = arrayFromDate[i];
    };

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = arrayFromDate[i];
    }
  };

  for (const element of toFormat) {
    if (element === 'DD') {
      newDateArray.push(day);
    };

    if (element === 'MM') {
      newDateArray.push(month);
    };

    if (
      (element === 'YY' && year.length === 2)
      || (element === 'YYYY' && year.length === 4)
    ) {
      newDateArray.push(year);
    };

    if (element === 'YY' && year.length === 4) {
      newDateArray.push(year.slice(2));
    };

    if (element === 'YYYY' && year.length === 2 && year < 30) {
      newDateArray.push(`20${year}`);
    };

    if (element === 'YYYY' && year.length === 2 && year >= 30) {
      newDateArray.push(`19${year}`);
    };
  };

  // eslint-disable-next-line no-console
  console.log(arrayFromDate, separator);

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
