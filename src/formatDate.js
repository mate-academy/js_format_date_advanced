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

  const separatorFrom = fromFormat[3];

  const values = date.split(separatorFrom);

  const formatedDate = Array(3);

  const indexDaysTo = toFormat.indexOf('DD');

  const indexMonthTo = toFormat.indexOf('MM');

  if (toFormat.includes('YY')) {
    indexYearsTo = toFormat.indexOf('YY');
    yearsToLength = 2;
  } else {
    indexYearsTo = toFormat.indexOf('YYYY');
    yearsToLength = 4;
  }

  const separatorTo = toFormat[3];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      formatedDate.fill(values[i], indexDaysTo, indexDaysTo + 1);
    } else if (fromFormat[i] === 'MM') {
      formatedDate.fill(values[i], indexMonthTo, indexMonthTo + 1);
    } else if ((fromFormat[i].length < yearsToLength) && (+values[i] < 30)) {
      formatedDate.fill(20 + values[i], indexYearsTo, indexYearsTo + 1);
    } else if ((fromFormat[i].length < yearsToLength) && (+values[i] >= 30)) {
      formatedDate.fill(19 + values[i], indexYearsTo, indexYearsTo + 1);
    } else if (fromFormat[i].length > yearsToLength) {
      formatedDate.fill(values[i].slice(2), indexYearsTo, indexYearsTo + 1);
    } else if (fromFormat[i].length === yearsToLength) {
      formatedDate.fill(values[i], indexYearsTo, indexYearsTo + 1);
    }
  }

  formatedDate.join(separatorTo);

  return formatedDate.join(separatorTo);
}

module.exports = formatDate;
