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
  const separatorDateNew = toFormat[3];
  const saparatorDateOld = fromFormat[3];
  const dateOldSplited = date.split(saparatorDateOld);
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  const dateNew = [];
  let formatOfYearNew;
  let indexOfYearNew;
  let indexOfYearOld;
  let dateOfYear;

  for (let i = 0; i < dateOldSplited.length; i++) {
    if (toFormat[i] === 'DD') {
      dateNew.push(dateOldSplited[indexOfDay]);
    }

    if (toFormat[i] === 'MM') {
      dateNew.push(dateOldSplited[indexOfMonth]);
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      formatOfYearNew = toFormat[i];
      indexOfYearNew = i;
    }
  }

  if (fromFormat.includes('YY')) {
    indexOfYearOld = fromFormat.indexOf('YY');
  }

  if (fromFormat.includes('YYYY')) {
    indexOfYearOld = fromFormat.indexOf('YYYY');
  }

  dateOfYear = dateOldSplited[indexOfYearOld];

  if (dateOfYear.length > formatOfYearNew.length) {
    dateOfYear = dateOfYear.substring(2);
  }

  if (dateOfYear.length < formatOfYearNew.length) {
    dateOfYear = dateOfYear < 30 ? '20' + dateOfYear : '19' + dateOfYear;
  }

  dateNew.splice(indexOfYearNew, 0, dateOfYear);

  return dateNew.join(separatorDateNew);
}

module.exports = formatDate;
