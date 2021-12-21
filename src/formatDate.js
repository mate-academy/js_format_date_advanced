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
  const newDate = Array(3);
  const checkMonthPosition = element => element === 'MM';
  const checkDayPosition = element => element === 'DD';
  const checkYear = element => element === 'YYYY' || element === 'YY';
  const checkYearPosition = element => element === undefined;
  const oldDate = date.split(fromFormat[3]);
  const oldMonthPosition = fromFormat.findIndex(checkMonthPosition);
  const oldDayPosition = fromFormat.findIndex(checkDayPosition);
  const oldYearFormat = fromFormat.find(checkYear);
  const oldYearPosition = fromFormat.findIndex(checkYear);
  const newMonthPosition = toFormat.findIndex(checkMonthPosition);
  const newDayPosition = toFormat.findIndex(checkDayPosition);

  newDate[newDayPosition] = oldDate[oldDayPosition];
  newDate[newMonthPosition] = oldDate[oldMonthPosition];

  const newYearFormat = toFormat.find(checkYear);
  const newYearPosition = newDate.findIndex(checkYearPosition);

  if (oldYearFormat.length === newYearFormat.length) {
    newDate[newYearPosition] = oldDate[oldYearPosition];
  };

  if (oldYearFormat.length > newYearFormat.length) {
    newDate[newYearPosition] = oldDate[oldYearPosition].slice(-2);
  };

  if (oldYearFormat.length < newYearFormat.length) {
    if (+oldDate[oldYearPosition] < 30) {
      newDate[newYearPosition] = '20' + oldDate[oldYearPosition];
    } else {
      newDate[newYearPosition] = '19' + oldDate[oldYearPosition];
    }
  };

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
