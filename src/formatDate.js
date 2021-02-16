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
  const separatorDateFinish = toFormat.splice(-1);
  const saparatorDateStart = fromFormat[fromFormat.length - 1];
  const dateStart = date.split(saparatorDateStart);
  const dateFinish = [];

  for (const value of toFormat) {
    const index = fromFormat.indexOf(value);

    if (index > -1) {
      dateFinish.push(dateStart[index]);
    } else {
      const formatOfYear = value;

      let indexOfYearFinish = toFormat.indexOf('YY');
      let indexOfYearStart = fromFormat.indexOf('YY');

      if (indexOfYearStart === -1) {
        indexOfYearStart = fromFormat.indexOf('YYYY');
      }

      if (indexOfYearFinish === -1) {
        indexOfYearFinish = toFormat.indexOf('YYYY');
      }

      let dateOfYear = dateStart[indexOfYearStart];

      if (dateOfYear.length > formatOfYear.length) {
        dateOfYear = dateOfYear.substring(2);
      }

      if (dateOfYear.length < formatOfYear.length) {
        dateOfYear = +dateOfYear < 30 ? '20' + dateOfYear : '19' + dateOfYear;
      }

      dateFinish.splice(indexOfYearFinish, 0, dateOfYear);
    }
  }

  return dateFinish.join(separatorDateFinish);
}

module.exports = formatDate;
