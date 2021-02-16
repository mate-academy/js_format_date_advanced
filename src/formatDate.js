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
  let indexYearsTo;
  let yearsToLength;

  const separatorFrom = fromFormat[fromFormat.length - 1];

  const dates = date.split(separatorFrom);

  const formatedDate = Array(3);

  const indexDaysTo = toFormat.indexOf('DD');

  const indexMonthTo = toFormat.indexOf('MM');

  for (const i in toFormat) {
    if ((toFormat[i] === 'YY') || (toFormat[i] === 'YYYY')) {
      indexYearsTo = toFormat.indexOf(toFormat[i]);
      yearsToLength = toFormat[i].length;
    }
  }

  const separatorTo = toFormat[toFormat.length - 1];

  for (const i in fromFormat) {
    if (fromFormat[i] === 'DD') {
      formatedDate.fill(dates[i], indexDaysTo, indexDaysTo + 1);
    } else if (fromFormat[i] === 'MM') {
      formatedDate.fill(dates[i], indexMonthTo, indexMonthTo + 1);
    } else if ((fromFormat[i].length < yearsToLength) && (+dates[i] < 30)) {
      formatedDate.fill(20 + dates[i], indexYearsTo, indexYearsTo + 1);
    } else if ((fromFormat[i].length < yearsToLength) && (+dates[i] >= 30)) {
      formatedDate.fill(19 + dates[i], indexYearsTo, indexYearsTo + 1);
    } else if (fromFormat[i].length > yearsToLength) {
      formatedDate.fill(dates[i].slice(2), indexYearsTo, indexYearsTo + 1);
    } else if (fromFormat[i].length === yearsToLength) {
      formatedDate.fill(dates[i], indexYearsTo, indexYearsTo + 1);
    }
  }

  formatedDate.join(separatorTo);

  return formatedDate.join(separatorTo);
}

module.exports = formatDate;
