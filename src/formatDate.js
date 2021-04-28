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
  const resultDateArr = [];
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const dateArr = date.split(separatorFrom);
  const separatorTo = toFormat[toFormat.length - 1];
  let indexOfYearFrom = fromFormat.indexOf('YYYY');

  if (indexOfYearFrom === -1) {
    indexOfYearFrom = fromFormat.indexOf('YY');
  }

  const indexOfMonthFrom = fromFormat.indexOf('MM');
  const indexOfDayFrom = fromFormat.indexOf('DD');
  let year = dateArr[indexOfYearFrom];
  const month = dateArr[indexOfMonthFrom];
  const day = dateArr[indexOfDayFrom];

  let indexOfYearTo = toFormat.indexOf('YYYY');

  if (indexOfYearTo === -1) {
    indexOfYearTo = toFormat.indexOf('YY');
  }

  const indexOfMonthTo = toFormat.indexOf('MM');
  const indexOfDayTo = toFormat.indexOf('DD');

  resultDateArr[indexOfMonthTo] = month;
  resultDateArr[indexOfDayTo] = day;

  const incomingYearLength = fromFormat[indexOfYearFrom].length;
  const outgoingYearLength = toFormat[indexOfYearTo].length;

  if (incomingYearLength === outgoingYearLength) {
    resultDateArr[indexOfYearTo] = year;

    return resultDateArr.join(separatorTo);
  }

  if (incomingYearLength > outgoingYearLength) {
    year = year.slice(2);
  } else if (incomingYearLength < outgoingYearLength) {
    if (parseInt(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }
  resultDateArr[indexOfYearTo] = year;

  const resultDateStr = resultDateArr.join(separatorTo);

  return resultDateStr;
}

module.exports = formatDate;
